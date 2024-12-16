let product = document.getElementById("product-grid");


async function getdata() {
    let res = await axios.get("");
    data = res.data
    Display(data.data)
}

function Display(data){
    product.innerHTML = '';

    data.forEach(element => {
        product.innerHTML +=`
           <div>
        `
    });
}