import bcrypt from "bcryptjs"

const SALT_ROUNDS = parseInt( process.env.SALT_ROUNDS || "10");

const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    
    return hashedPassword;
}

export default hashPassword;