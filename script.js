// Synchronizacja koloru z polem HEX
const colorInput = document.getElementById('color');
const colorHexInput = document.getElementById('colorHex');

colorInput.addEventListener('input', () => {
  colorHexInput.value = colorInput.value;
});
colorHexInput.addEventListener('input', () => {
  if (/^#[0-9A-Fa-f]{6}$/.test(colorHexInput.value)) {
    colorInput.value = colorHexInput.value;
  }
});

// Przygotowanie przycisku zapisu i załadowania ustawień
document.getElementById('saveButton').addEventListener('click', () => {
  const settings = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    color: document.getElementById('color').value,
    footer: document.getElementById('footer').value,
    image: document.getElementById('image').value,
    thumbnail: document.getElementById('thumbnail').value,
    avatar: document.getElementById('avatar').value,
    botName: document.getElementById('botName').value,
  };

  localStorage.setItem('embedSettings', JSON.stringify(settings));
  alert('Settings saved successfully!');
});

document.getElementById('loadButton').addEventListener('click', () => {
  const savedSettings = localStorage.getItem('embedSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);

    document.getElementById('title').value = settings.title;
    document.getElementById('description').value = settings.description;
    document.getElementById('color').value = settings.color;
    document.getElementById('colorHex').value = settings.color;
    document.getElementById('footer').value = settings.footer;
    document.getElementById('image').value = settings.image;
    document.getElementById('thumbnail').value = settings.thumbnail;
    document.getElementById('avatar').value = settings.avatar;
    document.getElementById('botName').value = settings.botName;

    alert('Settings loaded successfully!');
  } else {
    alert('No saved settings found.');
  }
});

// Obsługa podglądu
document.getElementById('previewButton').addEventListener('click', () => {
  const title = document.getElementById('title').value || 'Default Title';
  const description = document.getElementById('description').value || 'Default Description';
  const color = document.getElementById('color').value;
  const footer = document.getElementById('footer').value || 'Footer Text';
  const image = document.getElementById('image').value;
  const thumbnail = document.getElementById('thumbnail').value;
  const avatar = document.getElementById('avatar').value || 'https://via.placeholder.com/40';
  const botName = document.getElementById('botName').value || 'Embed Bot';

  const embedPreview = document.getElementById('embedPreview');
  embedPreview.innerHTML = `
    <div class="embed" style="border-left-color: ${color};">
      <div class="embed-header">
        <div class="embed-title" style="color: ${color};">${title}</div>
        <img src="${thumbnail}" alt="Thumbnail" class="embed-thumbnail">
      </div>
      <div class="embed-description">${description}</div>
      <div class="embed-footer">${footer}</div>
      <img src="${image}" alt="Image" class="embed-image">
      <div class="bot-info">
        <img src="${avatar}" alt="Avatar" class="bot-avatar">
        <div class="bot-name">${botName}</div>
      </div>
    </div>
  `;
});

// Form Submission (Send to Webhook)
document.getElementById('embedForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const webhookUrl = document.getElementById('webhookUrl').value;
  const payload = {
    embeds: [
      {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        color: parseInt(document.getElementById('color').value.replace('#', ''), 16),
        footer: { text: document.getElementById('footer').value },
        image: { url: document.getElementById('image').value },
        thumbnail: { url: document.getElementById('thumbnail').value },
      },
    ],
    username: document.getElementById('botName').value,
    avatar_url: document.getElementById('avatar').value,
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(response => {
    if (response.ok) {
      alert('Embed sent successfully!');
    } else {
      alert('Failed to send embed. Check your webhook URL.');
    }
  }).catch(error => alert('Error: ' + error));
});
