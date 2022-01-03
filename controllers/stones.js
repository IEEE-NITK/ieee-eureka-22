const Stone = require('../models/stone');

module.exports.index = async (req, res) => {
  const stones = await Stone.find({});
  res.render('stones/index', { stones });
};

module.exports.leaderBoard = async (req, res) => {
  res.render('stones/leaderboard');
}; /* 
module.exports.createCampground = async (req, res, next) => {
  const geocode = await Geocoder.forwardGeocode({
    query: req.body.campground.location,
    limit: 1,
  }).send();
  req.body.campground.geometry = geocode.body.features[0].geometry;
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  campground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  await campground.save();
  console.log(campground);
  req.flash('success', 'Successfully made a new Campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};
module.exports.showCampground = async (req, res) => {
  const campgrounds = await Campground.find({});
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .populate('author');
  if (!campground) {
    req.flash('error', 'Cannot find the specified Campground');
    res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
};
module.exports.renderEditForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash('error', 'Cannot find the specified Campground');
    res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground });
};
module.exports.editCampground = async (req, res) => {
  const { id } = req.params;
  const geocode = await Geocoder.forwardGeocode({
    query: req.body.campground.location,
    limit: 1,
  }).send();
  req.body.campground.geometry = geocode.body.features[0].geometry;
  const campground = await Campground.findByIdAndUpdate(req.params.id, {
    ...req.body.campground,
  });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  campground.images.push(...imgs);
  await campground.save();
  console.log(req.body.deleteImages ? 1 : 0);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne(
      { $pull: { images: { filename: { $in: req.body.deleteImages } } } },
      { new: true },
    );
    console.log(campground);
  }
  req.flash('success', 'Successfully updated Campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash('error', 'you do no have permission to do that!');
    return res.redirect(`/campgrounds/${id}`);
  }
  await Campground.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted Campground. :(');
  res.redirect(`/campgrounds/`);
};
 */
