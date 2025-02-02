const bcrypt = require('bcrypt');

async function generateHash() {
    const password = 'admin123'; // örnek admin şifresi
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
}

generateHash();
