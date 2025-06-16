import Address from "../models/AddressModel.js";

export const addAddress = async (req, res)=>{
    try {
        
        const userId = req.userId;
        const {address} = req.body;

        await Address.create({...address, userId});

        return res.status(200).json({success: true, message: "Address added successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const getAddresses = async (req, res)=>{
    try {
        const userId = req.userId;
        const addresses = await Address.find({userId});
        return res.status(200).json({success: true, addresses});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}