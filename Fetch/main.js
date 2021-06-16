// var postAPI = 'https://jsonplaceholder.typicode.com/posts';
// fetch(postAPI)
//     .then(function (response) {
//         return response.json();
//         // JSON.parse: JSON -> Javascript types
//     })
//     .then(function (posts) {
//         var htmls = posts.map(function (post) {
//             return `<li>
//                 <h2>${post.title}</h2>
//                 <p>${post.body}</p>
//             </li>`;
//         })
//         var html = htmls.join('');
//         document.getElementById('post-block').innerHTML = html;
//     })
//     .catch(function (err) {
//         console.log('Have error!!!');
//     })



var courseAPI = "http://localhost:3000/coursera";
function start() {
    getCourse(function (courses) {
        renderCourse(courses);
    });
    createForm()
}
//Start - chay dau tien
start();

// Function
function getCourse(callback) {
    fetch(courseAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
// Create course
function handleCreateCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseAPI, options)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}
// Delete Course
function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseAPI + '/' + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(function () {
            var courseitem = document.querySelector('.course__item--' + id)
            if (courseitem) {
                courseitem.remove()
            }
        })
}
// Update Course
function HandleUpdateCourse(id, data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseAPI + "/" + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}
// Render Course 
function renderCourse(courses) {
    var listCoursesBlock = document.querySelector("#list-courses");
    var htmls = courses.map(function (course) {
        return `<li class="course__item--${course.id}">
                <h4 class="course__title--${course.id}">${course.title}</h4>
                <p class="course__desc--${course.id}">${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">&times;</button>
                <button onclick="getCourseById(${course.id})">Update</button>
                </li>`;
    })
    listCoursesBlock.innerHTML = htmls.join('');
}
// Create new form
function createForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function () {
        var title = document.querySelector('input[name=title]').value;
        var description = document.querySelector('input[name=description]').value;
        var formdata = {
            title: title,
            description: description
        }
        handleCreateCourse(formdata, function () {
            getCourse(renderCourse);
        })
    }
}
// Update form
function updateForm(id) {
    var updateBtn = document.querySelector('#update');
    updateBtn.onclick = function () {
        var title = document.querySelector('input[name=title]').value;
        var description = document.querySelector('input[name=description]').value;
        var formdata = {
            title: title,
            description: description
        }
        HandleUpdateCourse(id, formdata, function () {
            document.querySelector('input[name=title]').setAttribute('value', '')
            document.querySelector('input[name=description]').setAttribute('value', '')
            getCourse(renderCourse);

        })
    }
}
// Get course by Id
function getCourseById(id) {
    var title1 = document.querySelector('input[name=title]');
    var description1 = document.querySelector('input[name=description]');
    var getTitle = document.querySelector('.course__title--' + id).textContent;
    var getDesc = document.querySelector('.course__desc--' + id).textContent;
    title1.setAttribute('value', getTitle)
    description1.setAttribute('value', getDesc);
    updateForm(id)

}