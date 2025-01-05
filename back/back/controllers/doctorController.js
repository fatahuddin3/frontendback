const Doctor = require('../models/Doctor');

/*exports.getAllDoctors = async (req, res) => {
    try {
        const doctor = await Doctor.find();
        res.status(200).json({
            "name": "Fatah",
            "specialization": "Neurology",
            "phone": "072737",
            "email": "fatah3@gmail.com"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};*/
//not needed this below it has gone to doctorRoutes
exports.createDoctor = async (req, res) => {
    const { name, specialization, phone, email } = req.body;
    const newDoctor = await Doctor.create({ name, specialization, phone, email });
    return res.status(201).json(newDoctor);

}
exports.getAlldoc = async (req, res) => {
    const alluser = await Doctor.find();
    return res.status(200).json(alluser);
}