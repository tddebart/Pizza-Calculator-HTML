let totalCreated = false;

let currentPizza;
let prevPizza;
let currentToppings = [];
let pinDiscount = false;


pizzas.forEach(pizza => {
    const pizzaPrice = "€" + (parseFloat(pizza.price) / 100).toFixed(2).toString()

    // Create grid item
    const div = document.createElement("div")
    div.className = "grid-item w3-hover-gray w3-button"
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
        image.style.maxHeight = "18ch"
        image.style.paddingRight = "10px"
        image.className = "w3-show-inline-block"
        image.style.alignSelf = "top"

        // Create holder
        const hold = document.createElement("div")
        hold.className = "w3-show-inline-block"
        hold.style.transform = "translateY(30%)"

        // Create description
        const desc = document.createElement("div");
        desc.innerText = pizza.description
        desc.style.fontSize = "20px"
        desc.style.maxWidth = "20vw"

        // Create price
        const price = document.createElement("div");
        price.innerText = pizzaPrice
        price.style.fontSize = "17px"

        //#region size dropdown
        
        // Create size holder
        const sizeHolder = document.createElement("div");

        // Create size
        const size = document.createElement("div");
        size.innerText = "Groote:"
        size.style.fontSize = "17px"
        size.className = "w3-show-inline-block"
        size.style.paddingRight = "7px"

        // Create size selector
        const sizeSelector = document.createElement("select");
        sizeSelector.style.padding = "3px"
        sizeSelector.className = "w3-show-inline-block"
        sizeSelector.addEventListener("change", updatePriceTotal)
        sizeSelector.id = "sizeSelector"

        sizes.forEach(size => {
            const sizeItem = document.createElement("option");
            sizeItem.innerText = size.name
            sizeItem.selected = size.selected
            sizeSelector.appendChild(sizeItem)
        })

        sizeHolder.appendChild(size)
        sizeHolder.appendChild(sizeSelector)

        //#endregion

        //#region slice dropdown


        // Create slice holder
        const sliceHolder = document.createElement("div");

        // Create slicing
        const slicing = document.createElement("div");
        slicing.innerText = "Pizza deling:"
        slicing.style.fontSize = "17px"
        slicing.className = "w3-show-inline-block"
        slicing.style.paddingRight = "7px"

        // Create slicing selector
        const sliceSelector = document.createElement("select");
        sliceSelector.style.padding = "3px"
        sliceSelector.className = "w3-show-inline-block"
        sliceSelector.addEventListener("change", updatePriceTotal)

        sliceSelector.id = "sliceSelector"

        slices.forEach(slice => {
            const sliceItem = document.createElement("option");
            sliceItem.innerText = slice.name
            sliceItem.selected = size.selected
            sliceSelector.appendChild(sliceItem)
        })

        sliceHolder.appendChild(slicing)
        sliceHolder.appendChild(sliceSelector)


        //#endregion

        // Apply children

        hold.appendChild(desc)
        hold.appendChild(price)
        hold.appendChild(sizeHolder)
        hold.appendChild(sliceHolder)

        info.appendChild(name)
        info.appendChild(image)
        info.appendChild(hold)

        currentPizza = pizza;
        updateTotalItems()
    }

    // Create image
    const image = document.createElement("img")
    image.src = pizza.img
    image.style.maxWidth = "15ch"
    image.style.maxHeight = "9ch"

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
    div.className = "grid-item w3-hover-gray w3-button"
    div.style.cursor = "pointer"
    div.onclick = function(){
        // Get toppings div and total container
        const info = document.getElementById("toppings")
        const container = document.getElementById("total-container");

        // Create main holder
        const hold = document.createElement("div")
        hold.style.cursor = "pointer"
        hold.className = "w3-hover-gray"
        hold.style.whiteSpace = "nowrap"
        hold.style.width = "min-content"
        hold.onclick = function(){
            const index = currentToppings.indexOf(topping)
            currentToppings.splice(index, 1)

            container.removeChild(document.getElementById(topping.name));
            info.removeChild(hold)
            updatePriceTotal()
        }

        // Create name
        const name = document.createElement("h3");
        name.innerText = topping.name

        // Create price
        const price = document.createElement("div");
        price.innerText = toppingPrice
        //price.style.border = "1px solid green"
        price.style.width = "min-content"

        hold.appendChild(name)
        hold.appendChild(price)

        info.appendChild(hold)

        container.appendChild(createItem(topping.name, "€" + (parseFloat(topping.price) / 100).toFixed(2).toString()));
        currentToppings.push(topping)
        updateTotalItems()
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

function updateTotalItems() {
    if(!totalCreated) {
        // Create container for items
        const container = document.getElementById("total-container");

        if(currentPizza != null) {
            container.appendChild(createItem(currentPizza.name, "€" + (parseFloat(currentPizza.price) / 100).toFixed(2).toString()));
        }

        totalCreated = true
        prevPizza = currentPizza;
        document.getElementById("show-later").className = "";
    } else {
        const pizzaItem = document.getElementById(prevPizza.name)
        if(pizzaItem != null) {
            pizzaItem.id = currentPizza.name;
            pizzaItem.childNodes[0].childNodes[0].textContent = currentPizza.name;
            pizzaItem.childNodes[0].childNodes[1].textContent = "€" + (parseFloat(currentPizza.price) / 100).toFixed(2).toString();
        }
        prevPizza = currentPizza;
    }
    updatePriceTotal()
}

function pinChanged() {
    const pin = document.getElementById("pin")
    if(pin.checked) {
        const discountDiv = document.getElementById("kortingen")
        discountDiv.appendChild(createItem("Pin korting", "€-0,50"))
        pinDiscount = true;
    } else {
        const discountDiv = document.getElementById("kortingen")
        discountDiv.removeChild(document.getElementById("Pin korting"))
        pinDiscount = false;
    }
    updatePriceTotal()
}

function updatePriceTotal() {
    const priceText = document.getElementById("total-price")

    let price = currentPizza.price;
    currentToppings.forEach(topping => {
        price += topping.price
    })

    price *= sizes[document.getElementById("sizeSelector").selectedIndex].keer

    price += slices[document.getElementById("sliceSelector").selectedIndex].price

    if(price > 50 && pinDiscount) {
        price -= 50
    }

    priceText.textContent = "€" + (parseFloat(price) / 100).toFixed(2).toString()
}

function createItem(itemName, itemPrice) {
    // create item
    const item = document.createElement("div");
    item.id = itemName;

    // name
    const name = document.createElement("div")
    name.innerText = itemName;
    name.id = itemName + "name"

    // price
    const price = document.createElement("span")
    price.innerText = itemPrice;
    price.style.float = "right"
    price.id = itemName + "price"

    // set children
    name.appendChild(price);
    item.appendChild(name)

    return item
}