const express = require('express');
const mongoose = require('mongoose');
const Stone = require('./models/stone');
/* const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers') */

/* const campPhotoLinks = [{url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783309/YelpCamp/pexels-cottonbro-5994749_ah4l88.jpg"
 ,filename:"YelpCamp/pexels-cottonbro-5994749_ah4l88"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783308/YelpCamp/pexels-quang-nguyen-vinh-4268140_ix22fd.jpg"
 ,filename:"YelpCamp/pexels-quang-nguyen-vinh-4268140_ix22fd"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783308/YelpCamp/pexels-matheus-bertelli-7510634_ivkdkf.jpg"
 ,filename:"YelpCamp/pexels-matheus-bertelli-7510634_ivkdkf"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783307/YelpCamp/pexels-cottonbro-5994742_fpjvug.jpg"
 ,filename:"YelpCamp/pexels-cottonbro-5994742_fpjvug.jpg"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783306/YelpCamp/tommy-lisbin-2DH-qMX6M4E-unsplash_1_l59dkc.jpg"
 ,filename:"YelpCamp/tommy-lisbin-2DH-qMX6M4E-unsplash_1_l59dkc"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783304/YelpCamp/pexels-mikhail-nilov-6623925_dsbbub.jpg"
 ,filename:"YelpCamp/pexels-mikhail-nilov-6623925_dsbbub"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783305/YelpCamp/pexels-anna-shvets-4014888_nsyhcy.jpg"
 ,filename:"YelpCamp/pexels-anna-shvets-4014888_nsyhcy"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783304/YelpCamp/pexels-michel-paz-2473845_ybqodi.jpg"
 ,filename:"YelpCamp/pexels-michel-paz-2473845_ybqodi"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783303/YelpCamp/pexels-%D0%B8%D0%B3%D0%BE%D1%80%D1%8C-%D1%86%D1%8B%D0%B1%D1%83%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9-8713324_me7hba.jpg"
 ,filename:"YelpCamp/pexels-%D0%B8%D0%B3%D0%BE%D1%80%D1%8C-%D1%86%D1%8B%D0%B1%D1%83%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9-8713324_me7hba"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783303/YelpCamp/pexels-hamid-tajik-5779093_zznbuj.jpg"
 ,filename:"YelpCamp/pexels-hamid-tajik-5779093_zznbuj"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783302/YelpCamp/everett-mcintire-BPCsppbNRMI-unsplash_bqh9cr.jpg"
 ,filename:"YelpCamp/everett-mcintire-BPCsppbNRMI-unsplash_bqh9cr"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783301/YelpCamp/pexels-cottonbro-6003064_mxivry.jpg"
 ,filename:"YelpCamp/pexels-cottonbro-6003064_mxivry"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783300/YelpCamp/falaq-lazuardi-YAyt4ZePq80-unsplash_zvutve.jpg"
 ,filename:"YelpCamp/falaq-lazuardi-YAyt4ZePq80-unsplash_zvutve"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783300/YelpCamp/pexels-xue-guangjian-1687845_hazvf9.jpg"
 ,filename:"YelpCamp/pexels-xue-guangjian-1687845_hazvf9"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783300/YelpCamp/pexels-matthew-devries-2526025_oro37u.jpg"
 ,filename:"YelpCamp/pexels-matthew-devries-2526025_oro37u"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783299/YelpCamp/kilarov-zaneit-Hxs6EAdI2Q8-unsplash_imzrhe.jpg"
 ,filename:"kilarov-zaneit-Hxs6EAdI2Q8-unsplash_imzrhe"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783299/YelpCamp/julie-rotter-Y03s37C6tQk-unsplash_ic677w.jpg"
 ,filename:"YelpCamp/julie-rotter-Y03s37C6tQk-unsplash_ic677w"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783299/YelpCamp/paxson-woelber-1yOkW4UwYbA-unsplash_ai2crb.jpg"
 ,filename:"YelpCamp/paxson-woelber-1yOkW4UwYbA-unsplash_ai2crb"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783298/YelpCamp/pexels-snapwire-699558_cyuqwy.jpg"
 ,filename:"YelpCamp/pexels-snapwire-699558_cyuqwy"},
 {url:"https://res.cloudinary.com/dn5mgadog/image/upload/v1629783299/YelpCamp/pexels-sagui-andrea-618848_y1mzo2.jpg"
 ,filename:"YelpCamp/pexels-sagui-andrea-618848_y1mzo2"}
]
 */

mongoose
  .connect(
    'mongodb+srv://utkar5hm:ZmCYXiCffpYCzc52@cluster0.xgsfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  )
  .then(console.log('connection to database Successfull'));

const seedDB = async function () {
  let stoneobj = {
    name: 'red Stone',
    title: 'Simple question',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imageURL:
      'https://cdn.sparkfun.com/assets/d/9/e/1/c/51c8bb1ece395fef60000001.png',
    filelink:
      'https://docs.google.com/document/d/1uv3f93CP1GctWrdsrkOfei5TUXU6_C-E7xOe8QgIfR0/edit?usp=sharing',
    hint: 'Theres no hint lmao',
    reward: 1,
    solution: 'hehe',
  };
  try {
    const stone = new Stone(stoneobj);
    await stone.save();
  } catch (e) {
    console.log('Catch an error: ', e);
  }
  console.log('successfully Seeded');
};

seedDB();
