import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = ''; // Thêm trường xác nhận mật khẩu
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if(!this.email || !this.password || !this.confirmPassword) {
      this.error = 'Vui lòng nhập đủ thông tin!';
      console.error('Please enter all required fields!');
      return;
    }
    // Kiểm tra mật khẩu có khớp không
    if (this.password !== this.confirmPassword) {
      this.error = 'Mật khẩu không khớp!';
      console.error('Password mismatch');
      return;
    }

    // Gọi hàm đăng ký nếu mật khẩu khớp
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.message;
        console.error('Registration error:', err);
      }
    });
  }
}