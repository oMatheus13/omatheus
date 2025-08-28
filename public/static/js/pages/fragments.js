document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.fragments__filter-button');
  const fragmentCards = document.querySelectorAll('.fragment-card');
  const filterList = document.getElementById('fragmentFilters'); // Get the filter list

  // Function to normalize a string for accent-insensitive comparison
  function normalizeString(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  // Function to extract all unique tags from the cards
  function getAllTags() {
    const allTags = new Set(); // Use a Set to store unique tags
    fragmentCards.forEach(card => {
      const tagsString = card.dataset.tags;
      if (tagsString) {
        const tagsArray = tagsString.split(' ');
        tagsArray.forEach(tag => {
          const trimmedTag = tag.trim();
          if (trimmedTag) {
            allTags.add(trimmedTag);
          }
        });
      }
    });
    return Array.from(allTags); // Convert the Set to an Array
  }

  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Function to generate filter buttons
  function generateFilterButtons(tags) {
    filterList.innerHTML = ''; // Clear existing filters
    filterList.appendChild(createFilterButton('all', 'Todos')); // Add "Todos" filter

    tags.forEach(tag => {
      const capitalizedTag = capitalizeFirstLetter(tag); // Capitalize the tag
      filterList.appendChild(createFilterButton(tag, capitalizedTag)); // Create button for each tag
    });

    // Re-attach event listeners after regenerating buttons (MOST IMPORTANT)
    attachFilterListeners();
  }

  // Helper function to create a filter button
  function createFilterButton(filterValue, buttonText) {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.classList.add('fragments__filter-button');
    button.dataset.filter = filterValue;
    button.textContent = buttonText;
    listItem.appendChild(button);
    return listItem;
  }

  function attachFilterListeners() {
    const filterButtons = document.querySelectorAll('.fragments__filter-button'); // Re-select buttons

    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        const filter = this.dataset.filter;
        const normalizedFilter = normalizeString(filter);

        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        fragmentCards.forEach(card => {
          const tags = card.dataset.tags;
          const normalizedTags = normalizeString(tags);

          if (filter === 'all' || normalizedTags.includes(normalizedFilter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // Initially select 'all' filter after listeners are attached
    document.querySelector('[data-filter="all"]').classList.add('active');
  }

  // Function to generate the tag list inside each card
  function generateCardTags(card) {
    const tagsString = card.dataset.tags;
    const tagsArray = tagsString ? tagsString.split(' ') : [];

    if (tagsArray.length === 0) {
      return null; // Return null if there are no tags
    }

    const tagsList = document.createElement('ul');
    tagsList.classList.add('fragment-card__tags');

    tagsArray.forEach(tag => {
      const tagItem = document.createElement('li');
      tagItem.classList.add('fragment-card__tag');
      tagItem.textContent = capitalizeFirstLetter(tag); // Capitalize the tag
      tagsList.appendChild(tagItem);
    });

    return tagsList;
  }

  // Get all unique tags
  const allUniqueTags = getAllTags();

  // Generate filter buttons dynamically
  generateFilterButtons(allUniqueTags);

  // Attach filter listeners (moved into its own function)
  attachFilterListeners();

  // Generate tag lists for each card
  fragmentCards.forEach(card => {
    const cardTags = generateCardTags(card);
    if (cardTags) { // Check if cardTags is not null
      const cardContent = card.querySelector('.fragment-card__content'); // Find the content div
      const cardButton = card.querySelector('.fragment-card__button');
      cardContent.insertBefore(cardTags, cardButton); // Insert the tags list before the button
    }
  });
});