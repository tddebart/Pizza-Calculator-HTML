let totalCreated = false;

let currentPizza;
let prevPizza;
let currentToppings = [];
let pinDiscount = false;
let bezorgd = false;
let prevSize
let prevSlice


pizzas.forEach(pizza => {
    const pizzaPrice = "€" + (parseFloat(pizza.price) / 100).toFixed(2).toString()

    // Create grid item
    const div = document.createElement("div")
    div.className = "grid-item w3-hover-gray w3-button"
    div.id = pizza.name+"grid"
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
        image.style.verticalAlign = 'top'

        // Create holder
        const hold = document.createElement("div")
        hold.className = "w3-show-inline-block"
        //hold.style.transform = "translateY(30%)"

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

        const discountDiv = document.getElementById("kortingen")

        // Create size selector
        const sizeSelector = document.createElement("select");
        sizeSelector.style.padding = "3px"
        sizeSelector.className = "w3-show-inline-block"
        sizeSelector.addEventListener("change", updatePriceTotal)
        // Create size item in total
        sizeSelector.addEventListener("change", function() {
            if (prevSize != null) {
                discountDiv.children[0].removeChild(document.getElementById(prevSize.name))
            }
            let currentSize = null
            sizes.forEach(size => {
                if(size.name.toLowerCase().toString() === sizeSelector.options[sizeSelector.selectedIndex].textContent.toLowerCase().toString()) {
                    currentSize = size
                }
            })
            if(currentSize.name !== 'Normal') {
                discountDiv.children[0].appendChild(createItem(sizeSelector.options[sizeSelector.selectedIndex].textContent, 'x'+currentSize.keer))
                prevSize = currentSize
            } else {
                prevSize = null
            }
        })
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
        // Create slie item in total
        sliceSelector.addEventListener("change", function() {
            if (prevSlice != null) {
                discountDiv.removeChild(document.getElementById(prevSlice.name))
            }
            let currentSlice = null
            slices.forEach(slice => {
                if(slice.name.toLowerCase().toString() === sliceSelector.options[sliceSelector.selectedIndex].textContent.toLowerCase().toString()) {
                    currentSlice = slice
                }
            })
            if (currentSlice.name !== 'Ongedeeld') {
                let slicePrice = "€" + (parseFloat(currentSlice.price) / 100).toFixed(2).toString()
                discountDiv.appendChild(createItem(sliceSelector.options[sliceSelector.selectedIndex].textContent, slicePrice))
                prevSlice = currentSlice
            } else {
                prevSlice = null
            }
        })

        sliceSelector.id = "sliceSelector"

        slices.forEach(slice => {
            const sliceItem = document.createElement("option");
            sliceItem.innerText = slice.name
            sliceItem.selected = slice.selected
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

ingredienten.forEach(ing => {
    for (let i = 0; i < 2; i++) {
        const input = document.createElement("input")
        input.type = "checkbox"
        input.autocomplete = "off"
        input.onchange = i===1 ? function () {filterChangedExclusive(ing)} : function () {filterChanged(ing)}
        input.id = ing+i.toString()
        input.style.marginLeft = '7px'
        input.style.marginRight = '6px'

        const label = document.createElement("label")
        label.textContent = ing.charAt(0).toUpperCase() + ing.slice(1)
        label.htmlFor = ing+i.toString()

        if(i===1) {
            const exclusive = document.getElementById('exclusief')
            exclusive.appendChild(input)
            exclusive.appendChild(label)
        } else{
            const inclusief = document.getElementById('inclusief')
            inclusief.appendChild(input)
            inclusief.appendChild(label)
        }

    }

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

function kortingChanged(kortingName, kortingPrice, checkId) {
    const check = document.getElementById(checkId)
    if(check.checked) {
        const discountDiv = document.getElementById("kortingen")
        discountDiv.appendChild(createItem(kortingName, kortingPrice))
        if(checkId.includes('pin')) {
            pinDiscount = true;
        } else if (checkId.includes('bezorgd')) {
            bezorgd = true
        }
    } else {
        const discountDiv = document.getElementById("kortingen")
        discountDiv.removeChild(document.getElementById(kortingName))
        if(checkId.includes('pin')) {
            pinDiscount = false;
        } else if (checkId.includes('bezorgd')) {
            bezorgd = false
        }
    }
    updatePriceTotal()
}

function updatePriceTotal() {
    if(currentPizza == null) return;
    const priceText = document.getElementById("total-price")

    let price = currentPizza.price;
    currentToppings.forEach(topping => {
        price += topping.price
    })

    price *= sizes[document.getElementById("sizeSelector").selectedIndex].keer

    price += slices[document.getElementById("sliceSelector").selectedIndex].price

    if(pinDiscount) {
        price -= 50
    }
    if(bezorgd) {
        price += 250
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

function filterChanged(filter) {
    if(document.getElementById(filter+'0').checked) {
        pizzas.forEach(pizza => {
            const pizDiv = document.getElementById(pizza.name+"grid")
            if(!pizza.description.toLowerCase().includes(filter.toLowerCase())) {
                pizDiv.className += " w3-hide"
            }
        })
    } else {
        pizzas.forEach(pizza => {
            const pizDiv = document.getElementById(pizza.name+"grid")
            if(!pizza.description.toLowerCase().includes(filter.toLowerCase())) {
                pizDiv.className = pizDiv.className.replace('w3-hide', '')
            }
        })
    }
}

function filterChangedExclusive(filter) {
    if(document.getElementById(filter+'1').checked) {
        pizzas.forEach(pizza => {
            const pizDiv = document.getElementById(pizza.name+"grid")
            if(pizza.description.toLowerCase().includes(filter.toLowerCase())) {
                pizDiv.className += " w3-hide"
            }
        })
    } else {
        pizzas.forEach(pizza => {
            const pizDiv = document.getElementById(pizza.name+"grid")
            if(pizza.description.toLowerCase().includes(filter.toLowerCase())) {
                pizDiv.className = pizDiv.className.replace('w3-hide', '')
            }
        })
    }
}

function openAccordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") === -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// From the internet
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}