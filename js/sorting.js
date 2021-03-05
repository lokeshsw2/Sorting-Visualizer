// Function for disabling buttons
function disableButtons() {
    let childButtons = document.getElementById("button-container").getElementsByTagName("*");
    for(let button of childButtons) {
        button.disabled = true;
        button.style.opacity = 0.5;
        button.style.cursor = "not-allowed";
    }
    let arr_size = document.getElementById("arr-sz");
    arr_size.disabled = true;
    arr_size.style.cursor = "not-allowed"
    let newArrayButton = document.getElementById("new-array");
    newArrayButton.disabled = true;
    newArrayButton.style.opacity = 0.5;
    newArrayButton.style.cursor = "not-allowed";
}

// Function for enabling buttons
function enableButtons() {
    let childButtons = document.getElementById("button-container").getElementsByTagName("*");
    for(let button of childButtons) {
        button.disabled = false;
        button.style.opacity = 1;
        button.style.cursor = "pointer";
    }
    let arr_size = document.getElementById("arr-sz");
    arr_size.disabled = false;
    arr_size.style.cursor = "pointer";
    let newArrayButton = document.getElementById("new-array");
    newArrayButton.disabled = false;
    newArrayButton.style.opacity = 1;
    newArrayButton.style.cursor = "pointer";
}

// set visualization speed
var speed;
function setSpeed() {    
    let sort_speed =document.getElementById("sort-speed");
    speed = 250 - parseInt(sort_speed.value);
}

// set barcount
var n;
function setBars() {
    let arr_size = document.getElementById("arr-sz");
    n = parseInt(arr_size.value);
    createBars();
}

// create bars
function createBars() {
    let arr = [];
    for(let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * 500));
    }
    
    document.getElementById("bars").innerHTML = "";
    
    for(let i = 0; i < n; i++) {
        var bar = document.createElement('div');
        bar.classList.add("bar");
        bar.style.height = `${arr[i]}px`;
        bars.appendChild(bar);
        document.getElementById("bars").appendChild(bar);
    }
}

// swap two bars
function swap(e1, e2) {  
    let temp_height = e2.clientHeight;
    e2.style.height = e1.style.height;
    e1.style.height = `${temp_height}px`;
}

// array of bars elements
var arr = document.getElementById("bars").childNodes;

// Bubble Sort
async function bubbleSort() {
    disableButtons();
    document.getElementById("bubble-sort").style.color = "white";
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n - i - 1; j++) {
            
            arr[j].style.background = "#FF4136";
            arr[j+1].style.background = "#FF4136";
            
            await new Promise(resolve => setTimeout(() => {resolve()}, speed));
            if(arr[j].offsetHeight > arr[j+1].offsetHeight) {
                let temp_height = arr[j+1].offsetHeight;
                arr[j+1].style.height = arr[j].style.height;
                arr[j].style.height = `${temp_height}px`;
            }
            
            arr[j].style.background = "#a3bcb6";
            arr[j+1].style.background = "#a3bcb6";
        }
        arr[n - i - 1].style.background = " #2ECC40";
    }
    document.getElementById("bubble-sort").style.color = "dodgerblue";
    enableButtons();
}

//selection sort
async function selectionSort() {
    disableButtons();
    document.getElementById("selection-sort").style.color = "white";
    let minElement = document.createElement("div");
    for(let i = 0; i < n; i++) {
        minElement = arr[i];
        minElement.style.background = "#0074D9";
        for(let j = i+1; j < n; j++) {
            arr[j].style.background = "red";
            await new Promise(resolve => setTimeout(() => {resolve()}, speed));
            if(minElement.clientHeight > arr[j].clientHeight) {
                minElement.style.background = "#a3bcb6";
                minElement = arr[j];
                minElement.style.backgroundColor = "#0074D9";
            } else {
                arr[j].style.background = "#a3bcb6";
            }
        }
        minElement.style.background = "#a3bcb6";
        swap(minElement, arr[i]);
        arr[i].style.background = "#2ECC40";
    }
    document.getElementById("selection-sort").style.color = "dodgerblue";
    enableButtons();
}

// insertion sort
async function insertionSort() {
    disableButtons();
    document.getElementById("insertion-sort").style.color = "white";
    let key = document.createElement("div");
    for(let i = 1; i < n; i++) {
        key = arr[i];
        let j = i - 1;
        let key_height = key.clientHeight;
        while(j >= 0 && arr[j].clientHeight > key_height) {
            
            arr[j+1].style.background = "red";
            await new Promise(resolve => setTimeout(() => {resolve()}, speed));
            arr[j+1].style.height = arr[j].style.height;
            arr[j+1].style.background = "#a3bcb6";
            j = j - 1;
        }
        arr[j+1].style.height = `${key_height}px`;
        arr[j+1].style.background = "#2ECC40";
        await new Promise(resolve => setTimeout(() => {resolve()}, speed));
        arr[j+1].style.background = "#a3bcb6";
    }
    
    for(let i = 0; i < n; i++) {
        arr[i].style.background = "#2ECC40";
    }
    document.getElementById("insertion-sort").style.color = "dodgerblue";
    enableButtons();
}

// merge sort
async function merge(s, e) {
    let mid = Math.floor((s + e) / 2);
    let i = s, j = mid + 1, k = s;
    let temp = new Array(100);
    
    while(i <= mid && j <= e) {
       
        if(arr[i].clientHeight < arr[j].clientHeight) {
            temp[k++] = arr[i++].clientHeight;
		} else if(arr[j].clientHeight < arr[i].clientHeight) {
            temp[k++] = arr[j++].clientHeight;
		} else {
            temp[k++] = arr[i++].clientHeight;
			temp[k++] = arr[j++].clientHeight;
		}
       
	}
    
	while(i <= mid) {
        temp[k++] = arr[i++].clientHeight;
	}
    
	while(j <= e) {
        temp[k++] = arr[j++].clientHeight;
	}
    
	for(let i = s; i <= e; i++) {
        arr[i].style.background = "red";
		arr[i].style.height = `${temp[i]}px`;
        await new Promise(resolve => setTimeout(() => {resolve()}, speed));
        arr[i].style.background = "#a3bcb6";
        if(e - s == n-1) {
            arr[i].style.background = "#2ECC40";
        } 
	}
}

async function mergeSort(s, e) {
    if(s >= e) return;
    let mid = Math.floor((s + e) / 2);
    await mergeSort(s, mid);
    await mergeSort(mid + 1, e);
    await merge(s, e);
}

async function mergeSortHelper() {
    disableButtons();
    document.getElementById("merge-sort").style.color = "white";
    await mergeSort(0, n-1);
    document.getElementById("merge-sort").style.color = "dodgerblue";
    enableButtons();
}

//quick sort
async function partition(s, e) {
    let i = s - 1;
    let pivot = arr[e].clientHeight;
    arr[e].style.background = "#0074D9";
    for(let j = s; j <= e-1; j++) {
        arr[j].style.background = "red";
        
        await new Promise(resolve => setTimeout(() => {resolve()}, speed));
        if(arr[j].clientHeight <= pivot) {
            i++;
            arr[i].style.background = "red";
            swap(arr[i], arr[j]);
            await new Promise(resolve => setTimeout(() => {resolve()}, speed));
            arr[i].style.background = "#a3bcb6";
        }
        
        arr[j].style.background = "#a3bcb6";
    }
    arr[e].style.background = "#a3bcb6";
    swap(arr[i+1], arr[e]);
    arr[i+1].style.background = "#2ECC40";
    return i+1;
}

async function quickSort(s, e) {
    if(s >= e) {
        if(s == e) {
            arr[e].style.background = "#2ECC40";
        }
        return;
    }
    let p = await partition(s, e);
    await quickSort(s, p-1);
    await quickSort(p+1, e);
}

async function quickSortHelper() {
    disableButtons();
    document.getElementById("quick-sort").style.color = "white";
    await quickSort(0, n-1);
    document.getElementById("quick-sort").style.color = "dodgerblue";
    enableButtons();
}

setBars();
setSpeed();
document.getElementById("new-array").addEventListener("click", createBars);
document.getElementById("bubble-sort").addEventListener("click", bubbleSort);
document.getElementById("merge-sort").addEventListener("click", mergeSortHelper);
document.getElementById("selection-sort").addEventListener("click", selectionSort);
document.getElementById("insertion-sort").addEventListener("click", insertionSort);
document.getElementById("quick-sort").addEventListener("click", quickSortHelper);
document.getElementById("arr-sz").addEventListener("input", setBars);
document.getElementById("sort-speed").addEventListener("input", setSpeed);
    



