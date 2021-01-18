const ShrunkUrl = require("../models/shrinkUrl");

//gets a list of all urls stored in the DB
module.exports.index = async (req, res) => {
  try {
    const shortUrls = await ShrunkUrl.find({});
    res.render("index", { shortUrls });
  } catch (error) {
    //I should be rendering an error page, i'll implement this late
    res.send("Error");
  }
};

//Create a new url
module.exports.createUrl = async (req, res) => {
  try {
    await ShrunkUrl.create({
      full: req.body.fullUrl,
    });
    res.redirect("/");
  } catch (error) {
    res.send("Error");
  }
};

//Access already stored Url
module.exports.accessUrl = async (req, res) => {
  try {
    const shrunkUrl = await ShrunkUrl.findOne({ short: req.params.shrunkUrl });
    if (!shrunkUrl) return res.sendStatus(404);
    shrunkUrl.clicks++;
    shrunkUrl.save();
    res.redirect(shrunkUrl.full);
  } catch (error) {
    res.send("Error");
  }
};

//Delete Url
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await ShrunkUrl.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.send("Error");
  }
};
