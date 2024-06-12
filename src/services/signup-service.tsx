
import axios from 'axios';
import { api } from './api';
import { toast } from 'react-toastify';
import { SignupForm } from '../interfaces/data/signup-form';

export class SignupService {
  async signupPost(singupForm : SignupForm) {
    const result = axios.post(`${api}/create-student`,
      singupForm
    )
      .then(response => {
        toast.success("Cadastro realizado com sucesso");
        return response
      })
      .catch((error) => {
        throw error
      })

    return await result
  }
}
