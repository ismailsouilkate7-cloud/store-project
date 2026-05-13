const products = [
    {
        id:1,
        name:"Braclet et Clou",
        price:100,
        img:"images/b5759554-b15b-44cc-ae8f-1e68ed83daeb.jpg",
        desc:"Bracelet élégant en acier inoxydable"
    },
    {
        id:2,
        name:"Braclet et Clou",
        price:200,
        img:"images/c228797c-6032-400e-8f37-6dc6c82a265e.jpg",
        desc:"Bracelet moderne avec finition brillante"
    },
    {
        id:3,
        name:"3 Braclet",
        price:150,
        img:"images/ef40885e-c002-47cd-b3da-133a673ebc4c.jpg",
        desc:"Set de 3 bracelets stylés"
    },

    {
        id:4,
        name:"3 Braclet",
        price:150,
        img:"images/bca4165f-2ce7-4a8c-b684-e2c2f8fb1d0f.jpg",
        desc:"Set de 3 bracelets stylés"
    },

    {
        id:5,
        name:"Bracelet Doré Chic",
        price:220,
        img:"images/f9c76539-9b34-4026-8497-5f1317af7c96.jpg",
        desc:"Bracelet doré délicat, idéal pour un look raffiné et moderne."
    },

    {
        id:6,
        name:"3 Braclet",
        price:150,
        img:"images/dd2ca4e4-3d59-4b00-9098-a0fefbf42abd.jpg",
        desc:"Set de 3 bracelets stylés"
    },
];

/* GET ID FROM URL */
let params = new URLSearchParams(window.location.search);
let id = params.get("id");

let p = products.find(x => x.id == id);

/* DISPLAY */
document.getElementById("productPage").innerHTML = `
    <img src="${p.img}" style="width:100%; max-width:300px;">
    <h2>${p.name}</h2>
    <p>${p.price} DH</p>
    <p>${p.desc}</p>
`;