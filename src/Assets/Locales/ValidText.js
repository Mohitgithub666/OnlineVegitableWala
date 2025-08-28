export default validText=({
    AuthText :{
        Email:
            {
                EmailEmptyError: "Please enter email",
                EmailAddressErrors:"An email address must contain a single @ ",
                EmailInvalidErrors:"The email address formate is invalid",
            },
            Addresss:{
                NameError: "this field is required",
                FirstNameError:"Please provide valid address",
            },
            AccountNumber:{
                NameError: "please enter the account number",
                FirstNameError:"Please provide valid number",
            },
            Phone:{
                PhoneError:"Please enter phone number.",
                PhoneNumberLengthError:"Phone number is less than 10 characters",
                PhoneNumberError:"Phone number must be numbers only",
                PhoneInvalidError:"It is invalid phone number",
            },
            Name:{
                NameError: "please enter the first name",
                FirstNameError:"Please provide valid name.",
            
            },
            Other:{
                NameError: "this field is required",
                FirstNameError:"",
            },
            LastName:{
                NameError: "please enter the last name",
                FirstNameError:"Please provide valid name.",
            
            },
            Location:{
                NameError: "please select the restaurant location",
                FirstNameError:"Please provide valid location.",
            },
            Password:{
                PasswordError: "please enter the password",
                PasswordLengthError:"Password must be 6 characters",
                PasswordMatch:"New password and confirm password are not matching",
                PasswordUppercaseError:" Password must be more than 6 characters with 1 uppercase & 1 number.",
        
            },
            PhoneNumber:{
                PhoneNumberError:"Please enter Email ID or mobile number",
                PhoneNumberValidError :"Please enter valid phone or email",
                PhoneNumberInvalidError:"please enter valid phone number"
            },
            OwnerName:{
                OwnerNameError:"Please enter the owner name ",
                OwnerNameInvalidError :"Please enter owner name",
            },
            RestaurantName:{
                RestaurantNameError:"Please enter the restaurant name ",
                RestaurantNameInvalidError :"Please enter restaurant name",
            },
            ShopType:{
                ShopTypeError:"Please select the shop type ",
                ShopTypeInvalidError :"Please enter shop type",
            },
            agrement:{
                agrementError:"Please select the agrement ",
                
            },
            
            LocationError: "Please enter location",
            CompletAllField:"Please complete all details",
            plzSelectCategory:'Please select category',
            plzSelectCuisine:'Please select cuisine',
    },
    OTHER:{
        plzSelectCoverImage:'Please select cover images',
        plzSelectProfileImage:'Please select profile image',
        plzEnterName:'Please enter name'
    }
    })