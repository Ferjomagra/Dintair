var mod = document.getElementById('mess');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == mod) {
        mod.style.display = "none";
    }
}
