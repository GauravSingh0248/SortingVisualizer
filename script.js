const container= document.getElementById("bars-container");

function createBars(numBars=50){
    container.innerHTML="";
    let arr=[];
    for(let i=0;i<numBars;i++){
        let val=Math.floor(Math.random()*300)+10;
        arr.push(val);
        let bar=document.createElement("div");
        bar.style.height=val+"px";
        bar.style.width="8px";
        bar.style.margin="1px";
        bar.style.backgroundColor="#6a0572";
        bar.style.display="inline-block";
        container.appendChild(bar);
    }
}

// initial bars on page //
createBars();

// bars change when slider moves ...//
document.getElementById("size").addEventListener("input",function(){
    createBars(parseInt(this.value));
});


//---------- Speed controller----------

function getDelay() {
    const spd=document.getElementById("speed").value;
    return 100-spd*9;
}


// -----------------------------------




// Buuble SOrt

async function buubleSort(){
    const bars=document.querySelectorAll("#bars-container div");
    let len=bars.length;

    for(let i=0;i<len-1;i++){
        for(let j=0;j<len-i-1;j++){
            bars[j].style.backgroundColor="red";
            bars[j+1].style.backgroundColor="red";

            await new Promise(resolve=>setTimeout(resolve,getDelay()));

            let h1=parseInt(bars[j].style.height);
            let h2=parseInt(bars[j+1].style.height);
            if(h1>h2){
                bars[j].style.height=h2 +"px";
                bars[j+1].style.height=h1+"px";
            }
            bars[j].style.backgroundColor="#6a0572";
            bars[j+1].style.backgroundColor="#6a0572";
        }
        bars[len-i-1].style.backgroundColor="green";
    }
    bars[0].style.backgroundColor="green";
}

document.querySelector(".sort-button").addEventListener("click",buubleSort);


//-------------------------------------- Insertion Sort-------------------------

async function insertionSort(){
    const bars=document.querySelectorAll("#bars-container div");
    let len=bars.length;

    for(let i=1;i<len;i++){
        let j=i;
        while(j>0){
            let h1=parseInt(bars[j].style.height);
            let h2=parseInt(bars[j-1].style.height);

            bars[j].style.backgroundColor="red";
            bars[j-1].style.backgroundColor="red";

            await new Promise(resolve => setTimeout(resolve, getDelay()));

            if(h1<h2){
                bars[j].style.height=h2+"px";
                bars[j-1].style.height=h1+"px";
            }else{
                bars[j].style.backgroundColor="#6a0572";
                bars[j-1].style.backgroundColor="#6a0572";
                break;
            }
            bars[j].style.backgroundColor="#6a0572";
            bars[j-1].style.backgroundColor="#6a0572";
            j--;
        }
    }
    bars.forEach(bar=>bar.style.backgroundColor="green");
}

// This selects all elements with the .sort-button class and gives you a NodeList (like an array).

const buttons =document.querySelectorAll(".sort-button");
buttons[1].addEventListener("click",insertionSort);



//-------------------------------------- Selection Sort-------------------------


async function SelectionSort(){
    const bars=document.querySelectorAll("#bars-container div");
    let len=bars.length;

    for(let i=0;i<len;i++){
        let minIndx=i;
        bars[minIndx].style.backgroundColor="blue";

        for(let j=i+1;j<len;j++){
            bars[j].style.backgroundColor="orange";
            await new Promise(resolve=>setTimeout(resolve,getDelay()));
            
            let h1=parseInt(bars[j].style.height);
            let h2=parseInt(bars[minIndx].style.height);
            
            if(h1<h2){
                bars[minIndx].style.backgroundColor="#6a0572";
                minIndx=j;
                bars[minIndx].style.backgroundColor="blue";
            }else{
                bars[j].style.backgroundColor="#6a0572";
            }
        }
        if(minIndx!==i){
            let temp=bars[i].style.height;
            bars[i].style.height=bars[minIndx].style.height;
            bars[minIndx].style.height=temp;
        }
        bars[minIndx].style.backgroundColor="#6a0572";
        bars[i].style.backgroundColor="green";
    }
    bars[len-1].style.backgroundColor="green";
}

buttons[2].addEventListener("click",insertionSort);

//-------------------------------------- Selection Sort END-------------------------





//------------------------------------ Merge Sort Start-------------------------

// -------Helper Function to Create Bar Heights Array----

function getHeight(){
    const bars=document.querySelectorAll("#bars-container div");
    return Array.from(bars).map(bar=>parseInt(bar.style.height));
}

function setHeight(arr){
    const bars =document.querySelectorAll("#bars-container div");
    arr.forEach((val,indx)=>{
        bars[indx].style.height=`${val}px`;
        bars[indx].style.backgroundColor="#6a0572";
    });
}
// -------------------------------------------------------

async function mergeSortHelper(arr,left,right,delay) {
    if(left>=right) return;
    const mid =Math.floor((left+right)/2);
    await mergeSortHelper(arr,left,mid,delay);
    await mergeSortHelper(arr,mid+1,right,delay);
    await merge(arr,left,mid,right,delay);
    setHeight(arr);
}

async function merge(arr,left,mid,right,delay) {
    let leftArr=arr.slice(left,mid+1);
    let rightArr=arr.slice(mid+1,right+1);

    let i=0,j=0,k=left;

    while(i<leftArr.length && j<rightArr.length) {
        await new Promise(resolve=>setTimeout(resolve,delay));

        if(leftArr[i]<=rightArr[j]) {
            arr[k++]=leftArr[i++];
        }else{
            arr[k++]=rightArr[j++];
        }
    }

    while(i<leftArr.length){
        await new Promise(resolve=>setTimeout(resolve,delay));
        arr[k++]=leftArr[i++];
    }

    while(j<rightArr.length){
        await new Promise(resolve=>setTimeout(resolve,delay));
        arr[k++]=rightArr[j++];
    }
}

async function mergeSort(){
    const arr=getHeight();
    await mergeSortHelper(arr,0,arr.length-1,getDelay());

    const bars=document.querySelectorAll("#bars-container div");
    for (let i=0;i<bars.length;i++) {
        bars[i].style.backgroundColor="green";
        await new Promise(resolve=>setTimeout(resolve, 10));
    }
}

buttons[3].addEventListener("click", mergeSort);

// -----------------------------------------Merge Sort End---------------------------------


// not sure about this line ----checkout later
let bars = document.querySelectorAll("#bars-container div");
document.getElementById("size").addEventListener("input", function(){
    createBars(parseInt(this.value));
    bars = document.querySelectorAll("#bars-container div"); // Re-select the bars
});



// -----------------------------------------Quick Sort Start---------------------------------

async function quickSort(low, high) {
    if (low < high) {
        let pi=await partition(low,high);
        await quickSort(low,pi-1);
        await quickSort(pi+1,high);
    }
    else if (low>=0 && high>=0 && low<bars.length && high<bars.length){
        bars[low].style.backgroundColor="green";
        bars[high].style.backgroundColor="green";
    }
}

async function partition(low,high) {
    let pivotHeight=parseInt(bars[high].style.height);
    bars[high].style.backgroundColor="blue";
    let i=low-1;

    for(let j=low;j<=high-1;j++) {
        bars[j].style.backgroundColor="red";
        await new Promise(resolve=>setTimeout(resolve,getDelay()));
        
        let h=parseInt(bars[j].style.height);
        if (h<pivotHeight) {
            i++;
            swapHeights(bars[i],bars[j]);
            bars[i].style.backgroundColor="orange";

            if(i!=j) 
                bars[j].style.backgroundColor="orange";
            
            await new Promise(resolve=>setTimeout(resolve,getDelay()));
        }
        else{ 
            bars[j].style.backgroundColor="#6a0572";
        }
    }

    swapHeights(bars[i+1],bars[high]);
    bars[high].style.backgroundColor="#6a0572";
    bars[i+1].style.backgroundColor="green";
    await new Promise(resolve=>setTimeout(resolve,getDelay()));
    
    return i+1;
}

function swapHeights(bar1,bar2) {
    let temp=bar1.style.height;
    bar1.style.height=bar2.style.height;
    bar2.style.height=temp;
}


buttons[4].addEventListener("click",()=>quickSort(0,bars.length-1));






