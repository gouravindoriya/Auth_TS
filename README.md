# Auth_TS


## Problem Statement Backend: Build a proper login authentication using JWT token, and there should be 4 roles and based on role there should be message. roles can be super admin, admin, teacher, student.



```json

{
users:{
    _id:mongooseID(),
    name:string,
    email:string,
    password:string,
    role:["superadmin","admin","teacher","student"],
    isVerified:boolean,
    timestamp:automatic by mongoose,
    // verificationToken:string, -> mail verification
    refreshToken:stirng, -> jwt token for the stateless auth
    // resetPasswordtoken: string, -> 
    // resetpasswordExpires:string, ->
}

}

```
### taking idea about user schema now try to write its use


verication token : use to verification a user by mail (one send to mail and one is token to a user mail)

