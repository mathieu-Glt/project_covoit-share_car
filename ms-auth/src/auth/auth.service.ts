/* eslint-disable @typescript-eslint/no-unused-vars */
import { getTokenInterface, signInInterface, signInResponseInterface } from './interface/authUp.interface'
import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef  } from '@nestjs/common'
import { parentAdminCreateInterface } from 'src/user/interface/userRes.interface'
import { AuthUserTokenDocument } from './Schema/authUserToken.schema'
import { RefreshTokenDocument } from './Schema/refreshToken.schema'
import { UserDocument } from 'src/user/Schema/user.schema'
import { NatsMessengerService } from '@app/nats-messenger'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { UserService } from '../user/user.service'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { error } from 'console'
import { uuid } from 'uuidv4'

//Service responsable de la gestion des opérations liées aux authentifications
@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @InjectModel('User')
    private userModel: Model<UserDocument>,
    @InjectModel('RefreshToken')
    private refreshTokenModel: Model<RefreshTokenDocument>,
    @InjectModel('AuthUserToken')
    private authUserTokenModel: Model<AuthUserTokenDocument>,
    private readonly natsMessengerService: NatsMessengerService,

  ) { }

     /**
     * User login.
     * @param body - signInInterface
     * @review => ok
     */
      async signIn(data: signInInterface): Promise<signInResponseInterface> {
        console.log("🚀 ~ file: auth.service.ts:45 ~ AuthService ~ signIn ~ data:", data)
      try {
        // Check if the user already exists
        const user = await this.userService.getUserByEmail(data.email)

        if(!user) {
          return {
            success: false,
            code: 400,
            user: null,
            tokens: null,
            error: 'Bad request'
          }

        } 
          console.log("🚀 ~ file: auth.service.ts:49 ~ AuthService ~ signIn ~ user:", user)

          const comparePassword = await bcrypt.compare(data.password, user.password)
          console.log("🚀 ~ file: auth.service.ts:52 ~ AuthService ~ signIn ~ comparePassword:", comparePassword)

        user.password = "";
          if (comparePassword) {
            // Succés 
            return {
              success: true,
              code: 200,
              user,
              tokens: await this.__handlerToken(user)
            }
          } else {
            // Mot de passe incorrect
            return {
              success: false,
              code: 400,
              user: null,
              tokens: null,
              error: 'Bad requests'
            }
  
          }

      } catch (error) {
          // Erreur inattendue du serveur
          return {
            success: false,
            code: 500,
            user: null,
            tokens: null,
            error: 'Internal server error'
          }
      }
    }

     /**
     * User logout 
     * @param params -  User ID 
     * @returns true if logout is successful
     * @review => ok
     */
    async logout(userId: string): Promise<boolean> {
      try {
        //verify if the user exists 
        if(await this.userService.hasUserById(userId)) 
        //If the user exists, it then calls the updateRefreshToken method to set the refreshToken value to null for that user,
          await this.updateRefreshToken(userId, { refreshToken: null })
        return true;// Logout successful
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Create parent profile for association creation (not through invitation)
     * @param body - parentAdminCreateInterface
     * @review => ok
     */
    // async register(body: parentAdminCreateInterface):Promise<UserDocument> {
      async register(body: parentAdminCreateInterface):Promise<any> {
        console.log("🚀 ~ file: auth.service.ts:97 ~ AuthService ~ register ~ body:", body)
      try { 
        const hashedPassword = await bcrypt.hash(body.password, await bcrypt.genSalt())
        console.log("🚀 ~ file: auth.service.ts:101 ~ AuthService ~ register ~ hashedPassword:", hashedPassword)
        const updateUser = {
          ...body,
          password: hashedPassword
        }
        console.log("🚀 ~ file: auth.service.ts:111 ~ register ~ updateUser:", updateUser)
        // Create and return the new user profile
        return await this.userService.newUserParentAdmin(updateUser) 
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Update the refreshToken for a user. 
     * @param body - RefreshTokenDto
     * @param params - user ID 
     * @review => ok
     */
    async updateRefreshToken(userId: string, refreshToken: RefreshTokenDto): Promise<RefreshTokenDocument> {
      try {
        return await this.refreshTokenModel.findByIdAndUpdate
          (
            userId,
            refreshToken,
            {  new: true, upsert: true }
          )
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * handles refreshtoken  
     * @param params - user ID  
     * @review => ok
     */
    async refreshTokens(userId: string): Promise<getTokenInterface> {
      try {
        // Get the user by ID
        const user = await this.userService.getUserById(userId)
        // Generate new tokens for the user
        const tokens = await this.getTokens(user)
        // Update the refresh token for the user
        await this.updateRefreshToken(user.id, { refreshToken: tokens.refreshToken })
        // Return the new access and refresh tokens
        return tokens
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

      /**
     * Generates and returns access and refresh tokens 
     * @param user - user  
     * @review => ok
     */
    async getTokens(user: UserDocument): Promise<getTokenInterface> {
      // Sign and generate access and refresh tokens asynchronously
      const [accessToken, refreshToken] = await Promise.all([
        // Generate the access token
        this.jwtService.signAsync(
          {
            user,
          },
          {
            // Secret key for the access token
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            // Token expiration time: 15 minutes
            expiresIn: '15m',
          },
        ),
        // Generate the refresh token
        this.jwtService.signAsync(
          {
            user
          },
          {
            // Secret key for the refresh token
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            // Token expiration time: 7 days
            expiresIn: '7d',
          },
        ),
      ])
      // Return the generated access and refresh tokens
      return {
        accessToken,
        refreshToken,
      }
    }

    /**
     * Retrieves a user from the refreshToken table that matches the users table. 
     * @param userId - user ID 
     * @returns The RefreshTokenDocument that corresponds to the provided user ID.
     * @review => ok
     */
    async getUserRefreshTokenById(user: string): Promise<RefreshTokenDocument> {
      try {
        return await this.refreshTokenModel.findById(user)
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Return authToken from provided token
     * @param token - token 
     * @review => ok
     */
    async findAuthTokenByToken(token: string): Promise<AuthUserTokenDocument> {
      try { 
        return this.authUserTokenModel.findOne({ token }) 
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Create authtoken from user email address 
     * @param email - user email 
     * @review => ok
     */
    async createAuthToken(email: string): Promise<AuthUserTokenDocument> {
        try {
        //get user details from email address 
        const user = await this.userService.getUserByEmail(email)
        //create new authtoken 
        return await this.authUserTokenModel.create({
            email: user.email,
            token: uuidv4(),
            user_id: user._id
          })
        } catch (error) {
          throw new NotFoundException(error)
        }
    }

    /**
     * Create link with token for forgotten password   
     * @param email - user email 
     * @review => ok
     */
    async  createLinkTokenForgotPassword(email: string): Promise<string> {
      try {
        //create new authtoken using the email address provided 
        const newAuthToken = await this.createAuthToken(email)
        //return the link with token 
        return `${process.env.PREFIX_URI}/auth/new-password/${newAuthToken.token}`
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Manage reset password   
     * @param userId - user ID  
     * @param newPassword - new password 
     * @review => ok
     */
    async createNewPassword(userId: string, newPassword: string): Promise<Omit<UserDocument,'password'>> {
      try {
        //hash the new password 
        const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt())
        // Update the user's password in the database
        const userUpdated =  await this.userModel.findByIdAndUpdate(
          { _id: userId }, 
          { password: hashedPassword }
        )
        // Remove the password field from the returned user document
        delete userUpdated.password;
        return userUpdated;
      } catch (error) {
        throw new NotFoundException(error)
      }
    }
 
    /**
     * Confirms the user parent's profile for token verification.
     * @param token - token
     * @returns The updated user document with the `isActive` field set to true. 
     * @review => ok
     */
    async confirmProfile(token: string):Promise<UserDocument> {
      try {
        // Find the email verification token in the authUserTokenModel
        const emailVerif = await this.authUserTokenModel.findOne({ token })
        // Update the user's `isActive` field to true in the userModel
        return await this.userModel.findByIdAndUpdate(
              emailVerif.user_id,
              {isActive: true}
        )
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Sends an email after creating a user profile.
     * @param userId - token 
     * @returns An object with a message indicating that the email has been sent.
     * @review => ok
     */
    async sendEmailProfileCreated(userId: string) {
      try {
        // Check if the user exists
        const userExists = await this.userService.getUserById(userId)
        if (!userExists) throw new NotFoundException('Utilisateur non trouvé ou e-mail non correspondant')
        // Check if the user's profile is active
        if (userExists.isActive === true) {
          // Emit an event to send the email for profile created
          await this.natsMessengerService.emitEmailProfileCreated(userExists.email)
          return { message: "Email envoyé" }
        }
      } catch (error) {
        throw new NotFoundException(error)
      }
    }
  
    /**
     * Sends an email for password reset request. 
     * @param email - Email address of the user.
     * @review => ok
     */
    async sendEmailForgotPassword(email: string) {
      try {
        // Create a reset password link with a token 
        const resetPasswordLink = await this.createLinkTokenForgotPassword(email);
        // Emit an event to send the email for forgot password
        await this.natsMessengerService.emitEmailForgotPassword(email, resetPasswordLink)
      } catch (error) {
        throw new NotFoundException(error)
      }
    }

    /**
     * Manages the creation and update of tokens.
     * @param user - UserDocument
     * @returns Tokens and their details.
     * @review ok
     */
    private async __handlerToken(user: UserDocument): Promise<getTokenInterface> {
      // Generate accessToken and refreshToken using the getTokens function
      // const tokens = await this.getTokens(user._id, user.email)
      const tokens = await this.getTokens(user)
      // Update the refreshToken in the database
      await this.updateRefreshToken(user._id, { refreshToken: tokens.refreshToken })
      // Return the generated tokens
      return tokens;
    }

}
