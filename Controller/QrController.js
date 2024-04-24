import qrService from "../Service/QrService.js";

const qrController = {
  getQr: async (req, res) => {
    try {
      const dataObj=req.body
      const qr_generate = await qrService.getQr(dataObj);
      res.status(200).send(qr_generate);
    } catch (error) {
      console.error(error);
    }
  },
  getTestQr:async(req,res)=>{
    try {
      const qrGen=await qrService.getTestQr()
      return qrGen
    } catch (error) {
      console.error(error)
    }
  }
};

export default qrController;
