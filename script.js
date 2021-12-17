// initialization of variables, those are going to be used.
var ML = document.querySelector('#moreList')

// 
var SelectCatagery = document.querySelector('#ctgry>.el')
var CtgLstForm = document.querySelector('#ctglstform')

// 
var saveclk = document.querySelector("#saveclk")
var askfrm = document.querySelector("#askingform")
var disview = document.querySelector('#disview')
var addctginp = document.querySelector("#addnewctg")
var addctgimgname = null
var addctgname = null
var getbtnind = null

// 
var svmdl = document.querySelector("#svmdl")
var catheadname = document.querySelector('#catheadname')
var catspnname = document.querySelector('#catspnname')

// 
var CtgryOpnBtn = document.querySelector('#cartview')
var mainlist = document.querySelector('#mainlist')
var slctedctgrylst = document.querySelector('#slctedctgrylst')

// 
var home = document.querySelector("#navlft a")

// 
var mnlst = document.querySelector("#mainlist")

// 
var closesvmdl = document.querySelector('#closesvmdl')

// main array initialization for local storage. "Single source of truth".
var CtgArray = []

// function to set or update the local storage.
function setlocal(val) {
    if (localStorage.getItem('lsArray') === null) {
        localStorage.setItem('lsArray', JSON.stringify(val));
    } else {
        localStorage.setItem('lsArray', JSON.stringify(val));
    }
}

// function to get the value of local storage.
function getlocal() {
    return JSON.parse(localStorage.getItem('lsArray'));
}

// function to show the catagory list into the desired div.
function showctgrs(where) {
    var val = '';
    let data = getlocal()
    data.forEach((elem) => {
        val += `<div class="el">
                    <label for="${elem.id}">
                    ${elem.CtgName}
                    </label>
                    <i id="${elem.id}" class="ri-delete-bin-6-line"></i>
                    <input type="radio" name="ctg" class="catagary" id="${elem.id}">
                </div>`;
    });
    where.innerHTML = val;
}

// function for deleting perticular catagory images.
CtgLstForm.addEventListener('click', (dets) => {
    var dbtnid = dets.target.id
    if (dets.path[0].className === 'ri-delete-bin-6-line') {
        var data = getlocal()
        var catlen = data[dbtnid].imgs.length
        if (catlen > 0) {
            alert("only a empty catagory can be deleted")
        } else if (catlen == 0) {
            data.splice(dbtnid, 1)
            data.forEach((elem, i) => {
                elem.id = i
            })
            setlocal(data)
            var lenofdata = Number(data.length)
            if (lenofdata == 0) {
                CtgFlg = true
                alert('All the catagery was deleted, hence you were redirected to home page')
                CtgLstForm.style.display = "none";
                mainlist.style.display = "flex";
                mainpageimgdisplay()
            } else if (lenofdata != 0) {
                if (catlen > 1) {
                    alert('current catagery was opened')
                    imgofslctcat(slctedctgrylst, dbtnid)
                } else if (catlen === 0) {
                    alert('previous catagery was opening')
                    imgofslctcat(slctedctgrylst, (Number(dbtnid) - 1))
                }
                showctgrs(ML)
            }
        }
    }
})

// drop down box for click functionality listner for catagory box.
var CtgFlg = true
SelectCatagery.addEventListener('click', () => {
    if (CtgFlg) {
        CtgFlg = false
        showctgrs(ML)
        CtgLstForm.style.display = "flex";
    } else {
        CtgFlg = true
        CtgLstForm.style.display = "none";
    }
})

// function to show the images of selected catagory.
function imgofslctcat(params, id) {
    var cltr = '';
    var data = getlocal()
    data[id].imgs.forEach((elem, i) => {
        cltr += `<div class="pic">
                    <div class="overimg">
                    <i id="${id}-${i}" class="ri-delete-bin-6-line"></i>
                    </div>
                    <img src="${elem}" alt="">
                </div>`
    })
    catheadname.textContent = data[id].CtgName;
    if (data[id].imgs.length > 0) {
        catspnname.textContent = data[id].imgs.length + "  images present";
    } else if (data[id].imgs.length === 0) {
        catspnname.textContent = " This catagery is empty ";
    }
    svmdl.style.display = 'none';
    mainlist.style.display = "none";
    params.style.display = 'flex';
    params.innerHTML = cltr;
}

// listner to show the images of selected catagory to the desired div.
CtgryOpnBtn.addEventListener('click', () => {
    getbtnind = null
    GetRadioBtnIndex()
    CtgFlg = true
    CtgLstForm.style.display = "none";
    imgofslctcat(slctedctgrylst, getbtnind)
})

// main images displaying array.
var mainimgarr = [
    { id: 1, img: './templet/P1.jpg' },
    { id: 2, img: './templet/P2.jpg' },
    { id: 3, img: './templet/P3.jpg' },
    { id: 4, img: './templet/P4.jpg' },
    { id: 5, img: './templet/P5.jpg' },
    { id: 6, img: './templet/P6.jpg' },
    { id: 7, img: './templet/P7.jpg' },
    { id: 8, img: './templet/P8.jpg' },
    { id: 9, img: './templet/P9.jpg' },
    { id: 10, img: './templet/P10.jpg' },
    { id: 11, img: './templet/image1.jpg' },
    { id: 12, img: './templet/image2.jpg' },
    { id: 13, img: './templet/image3.jpg' },
]

// function to show home page images having save and download button.
function mainpageimgdisplay() {
    var clutter = ``;
    mainimgarr.forEach((elem) => {
        clutter += `<div class="pic">
                        <div class="overimg">
                            <button name="${elem.img}" id="${elem.id}">save</button>
                            <a download href="${elem.img}"><i id="down-${elem.id}" class="ri-download-line"></i></a>
                        </div>
                        <img src='${elem.img}'>
                    </div>`
    })
    mnlst.innerHTML = clutter;
}
mainpageimgdisplay()

// listner to go to the home page in case you need to goto.
home.addEventListener('click', () => {
    CtgFlg = true
    CtgLstForm.style.display = "none";
    mainlist.style.display = "flex";
    mainpageimgdisplay()
})

// listner for save and download button.
mnlst.addEventListener('click', (dets) => {
    var iidd = dets.target.id
    addctgimgname = null
    if ((Number(iidd) != NaN) && (Number(iidd) > 0)) {
        addctginp.value = '';
        addctgimgname = dets.target.name
        svmdl.style.display = "flex"
        showctgrs(askfrm)
    } else if ((iidd != NaN) && (iidd != 0)) {
        var dnldid = iidd.split("-")[1]
    }
})

// function to get the value of radio button index.
function GetRadioBtnIndex() {
    getbtnind = null
    var AllRadioInp = document.querySelectorAll(`.catagary`)
    AllRadioInp.forEach((elem) => {
        if (elem.checked) {
            getbtnind = elem.id
        }
        return elem.id;
    })
}

// function to save the imges to your predefined catagory or in newly created catagory.
disview.addEventListener('click', () => {
    if (disview.textContent === "Add") {
        addctginp.value = '';
        var counter = false
        var data = getlocal()
        GetRadioBtnIndex()
        data.forEach((elem) => {
            if (elem.id == getbtnind) {
                elem.imgs.forEach((nm) => {
                    if (nm === addctgimgname) {
                        counter = true
                    }
                })
            }
        })
        if (counter === false) {
            svmdl.style.display = 'none';
            data.forEach((elem) => {
                if (elem.id == getbtnind) {
                    elem.imgs.push(addctgimgname)
                }
            })
            setlocal(data)
            alert(addctgimgname + " was saved in your catagory sucessfully.")
        } else {
            alert(addctgimgname + " is already exist in you catagary")
        }
    } else if (disview.textContent === "Add New Catagory") {
        addctginp.value = '';
        var counter = false
        var data = getlocal()
        var len = data.length
        data.forEach((elem) => {
            if (elem.CtgName === addctgname) {
                counter = true
            }
        })
        if (counter === false) {
            svmdl.style.display = 'none';
            data.push({ id: len, CtgName: addctgname, imgs: [addctgimgname] })
            var lenofcat = data.length
            setlocal(data)
            alert(addctgname + " was saved in your catagory sucessfully.")
        } else {
            alert(addctgname + " is already exist in you catagary")
        }
    }
})

// functionality for deleting image from perticular catagory
slctedctgrylst.addEventListener('click', (dets) => {
    var iidd = dets.target.id
    var ctgryindx = iidd.split("-")[0]
    var imgindx = iidd.split("-")[1]
    if ((iidd != NaN) && (iidd != 0)) {
        var data = getlocal()
        data[ctgryindx].imgs.splice(imgindx, 1)
        setlocal(data)
        var slctctglen = data[ctgryindx].imgs.length
        imgofslctcat(slctedctgrylst, ctgryindx)
    }
})

// listner to change the textcontent of the button accordingly.
addctginp.addEventListener('input', () => {
    addctgname = null
    if (isNaN(addctginp.value)) {
        disview.textContent = 'Add New Catagory';
        addctgname = addctginp.value
    } else {
        disview.textContent = 'Add';
    }
})

// listner to close the div,opened by clicking on the save button. 
closesvmdl.addEventListener('click', () => {
    svmdl.style.display = "none"
})
