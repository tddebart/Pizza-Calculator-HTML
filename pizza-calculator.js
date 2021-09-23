

pizzas.forEach(pizza => {
    const pizzaPrice = "€" + (parseFloat(pizza.price) / 100).toFixed(2).toString()

    // Create grid item
    const div = document.createElement("div")
    div.className = "grid-item w3-hover-gray"
    div.style.cursor = "pointer"
    div.onclick = function () {
        // Get info and reset it
        const info = document.getElementById("info1")
        info.innerHTML = ""

        // Create name
        const name = document.createElement("h3");
        name.innerText = pizza.name

        // Create image
        const image = document.createElement("img")
        image.src = pizza.img
        image.style.maxWidth = "20ch"
        image.style.paddingRight = "10px"
        image.className = "w3-show-inline-block"

        // Create holder
        const hold = document.createElement("div")
        hold.className = "w3-show-inline-block"

        // Create description
        const desc = document.createElement("div");
        desc.innerText = pizza.description

        // Create price
        const price = document.createElement("div");
        price.innerText = pizzaPrice
        //price.style.border = "1px solid green"
        price.style.width = "min-content"

        hold.appendChild(desc)
        hold.appendChild(price)

        info.appendChild(name)
        info.appendChild(image)
        info.appendChild(hold)
    }

    // Create image
    const image = document.createElement("img")
    image.src = pizza.img
    image.style.maxWidth = "15ch"

    // Create item1
    const text1 = document.createElement("div");
    text1.innerText = pizza.name

    // Create item2
    const text2 = document.createElement("div");
    text2.innerText = pizzaPrice

    // Add items to parent
    div.appendChild(image)
    div.appendChild(text1)
    div.appendChild(text2)

    // Add list item to main list
    const grid = document.getElementById("grid1");
    grid.appendChild(div)
})

toppings.forEach(topping => {
    const toppingPrice = "€" + (parseFloat(topping.price)/100).toFixed(2).toString()

    // Create grid item
    const div = document.createElement("div")
    div.className = "grid-item w3-hover-gray"
    div.style.cursor = "pointer"
    div.onclick = function(){
        // Get info and reset it
        const info = document.getElementById("info2")
        info.innerHTML = ""

        // Create name
        const name = document.createElement("h3");
        name.innerText = topping.name

        // Create price
        const price = document.createElement("div");
        price.innerText = toppingPrice
        //price.style.border = "1px solid green"
        price.style.width = "min-content"

        info.appendChild(name)
        info.appendChild(price)
    }

    // Create item1
    const text1 = document.createElement("div");
    text1.innerText = topping.name

    // Create item2
    const text2 = document.createElement("div");
    text2.innerText = toppingPrice

    // Add items to parent
    div.appendChild(text1)
    div.appendChild(text2)

    // Add list item to main list
    const grid = document.getElementById("grid2");
    grid.appendChild(div)
})

function updateTotal() {

}