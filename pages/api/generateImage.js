

const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('ee756e4e-8cc6-45fb-88c3-0272bbfd036c');


export default async function (req, res) {

const text = req.body.text;

  try{
    const resp = await deepai.callStandardApi("text2img", {
            text: text,
    });
    console.log(resp);
     res.status(200).json({result: resp})
     res.status(200).json({ output_url: resp.output_url });
  }

  catch(error)
  {
     console.log(error);
  }

}
