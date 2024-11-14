import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verifica se o código está sendo executado no cliente
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.router.navigate(['/read-all']); // Se o token existir, redireciona para a página principal
    }
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http.post<{ token: string }>('http://localhost:8080/auth/login', loginData)
        .subscribe(
          response => {
            localStorage.setItem('token', response.token);  // Armazena o token no localStorage
            this.snackBar.open('Login realizado com sucesso!', 'Fechar', { duration: 2000 });

            // Após o login bem-sucedido, redireciona para a página 'read-all'
            this.router.navigate(['/read-all']);
          },
          error => {
            this.snackBar.open('Erro ao realizar login. Tente novamente.', 'Fechar', { duration: 2000 });
          }
        );
    } else {
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', { duration: 2000 });
    }
  }
}
