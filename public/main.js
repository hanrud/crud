const update = document.getElementById("switch");
const deleteEntry = document.getElementById("delete");

update.addEventListener('click', () => {
    fetch('titles', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'title': 'Title has been changed!!!',
            'description': 'Description also has benn changed'
        })
    })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
});

deleteEntry.addEventListener('click', () => {
   fetch('titles', {
       method: 'delete',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           title: 'Title has been changed!!!'
       })
   }).then(res => {
       window.location.reload();
   })
       .catch(err => {
           console.log(err)
       })
});