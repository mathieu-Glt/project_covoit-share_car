/* eslint-disable @typescript-eslint/no-unused-vars */
import { acknowledgeResponseinterface, getTokenInterface, userPayload } from './interface/authUp.interface'
import { BadRequestException, Controller, NotFoundException, UseInterceptors, ValidationPipe } from '@nestjs/common'
import { RpcSuccessInterceptor } from 'src/Interceptor/RpcSuccessInterceptor'
import { AuthUserTokenDocument } from './Schema/authUserToken.schema'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateUserDto } from 'src/user/Dto/createUser.dto'
import { UserDocument } from 'src/user/Schema/user.schema'
import { userEmailDto } from 'src/user/Dto/userEmail.dto'
import { NewPasswordDto } from './dto/newPassword.dto'
import { UserService } from 'src/user/user.service'
import { signInDto } from './dto/signIn.dto'
import { AuthService } from './auth.service'
import { IdDto } from 'src/user/Dto/id.dto'
import { TokenDto } from './dto/token.dto'

// Controller responsible for handling authentication-related API endpoints
@Controller()
@UseInterceptors(RpcSuccessInterceptor)
export class AuthController {
    constructor(
      private authService: AuthService,
      private userService: UserService
    ) { }

    /**
     * User login 
     * @param body - signInDto - login data
     * POST - 'auth/login'
     * @review => ok
     */
    @MessagePattern('LOGIN')

    async signIn(@Payload('body', new ValidationPipe()) body: signInDto) {
      console.log("🚀 ~ file: auth.controller.ts:34 ~ AuthController ~ signIn ~ body:", body)
      try {
        const signIn = await this.authService.signIn(body);
        console.log("🚀 ~ file: auth.controller.ts:36 ~ AuthController ~ signIn ~ signIn:", signIn)
        return signIn;
      } catch (error) {
        console.log("🚀 ~ file: auth.controller.ts:38 ~ AuthController ~ signIn ~ error:", error)
        throw new NotFoundException(error)
      }
    }

    /**
     * User logout 
     * @param user - userPayload
     * POST - 'auth/logout'
     * @review => ok
     */
    @MessagePattern('LOGOUT')
    async logout(@Payload('user') user: userPayload): Promise<acknowledgeResponseinterface> {
      try {
        const acknowledge = await this.authService.logout(user.sub)
        console.log("🚀 ~ file: auth.controller.ts:55 ~ AuthController ~ logout ~ acknowledge:", acknowledge)
        return {
          acknowledge
        }
      }
      catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Handling forgotten password 
     * @param body - userEmailDto - user email address 
     * POST - 'auth/forgot-password'
     * @review => ok
     */
    @MessagePattern('FORGOT_PASSWORD')
    async forgotPassword(@Payload('body', new ValidationPipe()) body: userEmailDto): Promise<acknowledgeResponseinterface> {
      try {
        await this.authService.sendEmailForgotPassword(body.email)
        return { acknowledge: true }
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Handling token refresh    
     * @param user - userPayload
     * GET - 'auth/refresh-token'
     * @review => ok
     */
    @MessagePattern('REFRESHTOKEN')
    async Refresh(@Payload('user') user: userPayload): Promise<any> {
      
      console.log("🚀 ~ AuthController ~ Refresh ~ user:", user)
      try {
        return await this.authService.refreshTokens(user.sub);
      }
      catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Handling password change 
     * @param body - NewPasswordDto 
     * @param params - TokenDto
     * POST - 'auth/new-password/:token'
     * @review => ok
     */
    @MessagePattern('NEW_PASSWORD')
    async newUserPassword(
      @Payload('body') body: NewPasswordDto, 
      @Payload('params') params: TokenDto): Promise<Omit<UserDocument, "password">> {
      try {
        // Check passwords 
        if (body.password !== body.confirmPassword) throw new BadRequestException('Passwords do not match')
        // Get email and ID of the user 
        const authToken = await this.authService.findAuthTokenByToken(params.token)
        // Check user's existence   
        await this.userService.hasUserById(authToken.user_id);
        // Set new password
        return await this.authService.createNewPassword(authToken.user_id, body.password) 
          } catch (error) {
            throw new NotFoundException(error)
        }
    }

    /**
     * Handling password change 
     * @param body - NewPasswordDto 
     * @param params - UserId
     * PUT - 'auth/newpassword/:userId'
     * @review => ok
     */
      @MessagePattern('NEW_PASSWORD_USER')
      async userNewPassword(
        @Payload('body') body: NewPasswordDto, 
        @Payload('params') params: IdDto): Promise<UserDocument> {
          try {
            console.log("🚀 ~ file: auth.controller.ts:131 ~ AuthController ~ @Payload ~ params:", params.userId)
            console.log("🚀 ~ file: auth.controller.ts:131 ~ AuthController ~ body:", body)
            // Check user's existence 
            const userExists =  await this.userService.getUserById(params.userId)
            console.log("🚀 ~ file: auth.controller.ts:136 ~ AuthController ~ @Payload ~ userExists:", userExists)
            if(!userExists) throw new BadRequestException('User does not exists !')
            const userPasswordUpdate = this.userService.updatePasswordUser(params.userId, body)
            return userPasswordUpdate;
          } catch (error) {
            throw new NotFoundException(error)

          }
        }




    

    /**
     * Create a new profile admin(parent) for the creation of an association    
     * @param body - CreateUserDto
     * POST - 'auth/register'
     * @review => ok
     */
    @MessagePattern('REGISTER_PARENT_ADMIN')
    async signUp(@Payload('body') body: CreateUserDto) {
      // console.log("🚀 ~ file: auth.controller.ts:129 ~ AuthController ~ signUp ~ body:", body)
      try {
        return await this.authService.register(body)  
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Modification of parent(admin) after verification email+token 
     * @param params - TokenDto
     * GET - 'auth/confirm-profile/admin/:token'
     * @review => ok
     */
    @MessagePattern('CONFIRM_PROFILE_PARENT_ADMIN')
    async confirmParentProfileAdmin(@Payload('params') params: TokenDto): Promise<UserDocument>  {
      try {
        return await this.authService.confirmProfile(params.token)
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Modification of parent(admin) upon creation profile  
     * @param params - IdDto - user ID 
     * @param body - createUserDto 
     * POST - 'user/update-profile/:id'
     * @review => ok
     */ 
    @MessagePattern('UPDATE_PARENT_ADMIN_PROFILE')
    async updateParentAdminProfile(
      @Payload('params') params: IdDto, //user ID 
      @Payload('body') body: CreateUserDto): Promise<UserDocument> {
      try {
        return await this.userService.userParentAdminEdit(params.id, body)
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Modification of parent(user) upon creation profile 
     * @param params - TokenDto
     * GET - 'auth/confirm-profile/:token'
     * @review => ok
     */
    @MessagePattern('CONFIRM_PROFILE_PARENT_USER')
    async confirmParentProfile(@Payload('params') params: TokenDto): Promise<UserDocument> {
      try {
        return await this.authService.confirmProfile(params.token)
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Modification of a parent upon creation profile 
     * @param params - IdDto - user ID 
     * @param body - CreateUserDto
     * POST - 'user/update-profile/:id'
     * @review => ok
     */
    @MessagePattern('UPDATE_PARENT_PROFILE')
    async updateParentProfile(@Payload('params') params: IdDto, @Payload('body') body: CreateUserDto): Promise<UserDocument> {
      try {
        return await this.userService.setUser(params.id, body)
      } catch (error) {
        throw new NotFoundException(error)
      } 
    }

    /**
     * Retrieve authToken (including user ID) through Token
     * @param params - TokenDto - token 
     * GET - 'auth/token/:token'
     * @review => ok
     */
    @MessagePattern('AUTHTOKEN_BY_TOKEN')
      async findAuthTokenByToken(@Payload('params') params: TokenDto): Promise<AuthUserTokenDocument> {
        try {
        const user =  await this.authService.findAuthTokenByToken(params.token)
        console.log("🚀 ~ file: auth.controller.ts:211 ~ AuthController ~ findAuthTokenByToken ~ user:", user)
        return user;
      } catch (error) {
        throw new NotFoundException('oups')
      }
    }
}