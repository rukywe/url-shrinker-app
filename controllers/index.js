const ShrunkUrl = require("../models/shrinkUrl");

//gets a list of all urls stored in the DB
module.exports.index = async (req, res) => {
    const shortUrls = await ShrunkUrl.find({});
    res.render("index", { shortUrls });
  };


  //Create a new url 
  module.exports.createUrl = async (req, res) => {
    await ShrunkUrl.create({
      full: req.body.fullUrl,
    });
    res.redirect("/");
  };

  //Access already stored Url
  module.exports.accessUrl = async (req, res) => {
    const shrunkUrl = await ShrunkUrl.findOne({ short: req.params.shrunkUrl });
    if (!shrunkUrl) return res.sendStatus(404);
    shrunkUrl.clicks++;
    shrunkUrl.save();
    res.redirect(shrunkUrl.full);
    
  };
  
//Delete Url
  module.exports.delete = async (req, res) => {
    const { id } = req.params;
     await ShrunkUrl.findByIdAndDelete(id);
    res.redirect("/");
  };
  