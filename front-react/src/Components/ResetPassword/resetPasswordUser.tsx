import './resetPasswordUser.style.css';
import { FormEvent, useState } from "react";

export default function ResetPasswordUser() {
    
    const [newUserPassword, setNewUserPassword] = useState({
        newPassword: "",
        confirmPassword: "",
    });


    // Function sends login form
    const handleRegisterForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Login as licked');
        // try {
        //     const response = await Register(newUserPassword)
        //     console.log("🚀 ~ file: LoginForm.tsx:32 ~ handleLoginForm ~ response:", response)
        // } catch (error) {
        //     console.log('erreur signin' + error)
        // }
    };
    
    // Set value inputs login form
    const handleChange = (e: any) => {
    const { name, value }: any = e.target;
    setNewUserPassword({ ...newUserPassword, [name]: value });
  };

  return (
      <div className="d-flex justify-content-center algn-items-center mt-5">
          <form onSubmit={(e) => handleRegisterForm(e)} className="d-flex flex-column">
              <input 
                className="form-label mt-3"
                type="password" 
                onChange={(e) => handleChange(e)} 
                name="newPassword" 
                id="newPassword" 
                placeholder="Nouveaux mot de passe" 
              />
              <input 
                className="form-label mt-3"
                type="password" 
                onChange={(e) => handleChange(e)} 
                name="comfirmPassword"
                id="confirmPassword" 
                placeholder="Confirmer mot de passe" 
              />
              <input className="btn btn-primary mt-5" type="submit" value="Changer mot de passe"/>
          </form>
    </div>
  )
}