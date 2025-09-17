    using System.ComponentModel.DataAnnotations;

    namespace my_backend_app.Models.DTO
    {
        public class CreateUserDTO
        {

            [Required]
            [Display(Name = "نام کاربری")]
            public required string UserName { get; set; }
            [Required]
            [Display(Name = "شماره موبایل")]
            public required string Phone { get; set; }
            [Required]
            [DataType(DataType.Password)]
            [Display(Name = "رمز عبور")]
            public required string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "تکرار رمز عبور")]
            [Compare("Password", ErrorMessage = "رمزها یکسان نیستند")]
            public required string ConfirmPassword { get; set; }

        }
    }
