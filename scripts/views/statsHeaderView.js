
const statsHeaderItemsE = document.querySelectorAll('.stats-header nav ul li');

function showStatsHeaderDropdown(element) {
	let clickedItemE = element.parentNode;

	// unselect all statsHeaderItemsE except this one
    statsHeaderItemsE.forEach((item) => {
        if (item !== clickedItemE) {
            item.classList.remove('selected');
            item.querySelector('.stats-header__dropdown').classList.add('hidden');
            item.querySelector('.stats-header__dropdown-pointer').classList.add('hidden');
        }
    });

	// swich state of item
	dropdownE = clickedItemE.querySelector('.stats-header__dropdown');
	dropdownPointerE = clickedItemE.querySelector('.stats-header__dropdown-pointer');
	if (dropdownE.classList.contains('hidden')) {
		dropdownE.classList.remove('hidden');
		dropdownPointerE.classList.remove('hidden');
	} else {
		dropdownE.classList.add('hidden');
		dropdownPointerE.classList.add('hidden');
	}
}

document.querySelectorAll('.stats-header__dropdown').forEach((overlay) => {
	overlay.addEventListener('click', (e) => {
		statsHeaderItemsE.forEach((item) => {
			item.classList.remove('selected');
			item.querySelector('.stats-header__dropdown').classList.add('hidden');
			item.querySelector('.stats-header__dropdown-pointer').classList.add('hidden');
		});
	});
});