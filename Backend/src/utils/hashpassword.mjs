import bcrypt from'bcrypt'

const saltRound=10;
export const hashpassword=(password)=>{
    // console.log(password);
    const salt=bcrypt.genSaltSync(saltRound);
    return bcrypt.hashSync(password,salt);
}

export const comparePassword=(password,hashpassword)=>{
    return bcrypt.compareSync(password,hashpassword)
}
//This method returns boolean based on the value passed