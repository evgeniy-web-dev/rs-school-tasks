document.querySelectorAll('.progress').forEach(progress => progress.addEventListener('input', function () {
    const value = this.value * 100;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
}));