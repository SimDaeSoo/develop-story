export const youtubePlugin = (editor) => {
  const codeBlockManager = Object.getPrototypeOf(editor).constructor.codeBlockManager;

  codeBlockManager.setReplacer('youtube', (JSON_STRING) => {
    try {
      const { youtubeID, ratio } = JSON.parse(JSON_STRING);
      const wrapperId = `youtube${Math.random().toString(36).substr(2, 10)}`;
      setTimeout(renderYoutube.bind(null, wrapperId, youtubeID), 0);

      return `<div id="${wrapperId}" style='width: 100vh; max-width:100%; height: 100%; margin:auto; padding-top: ${(ratio.height / ratio.width * 100).toFixed(2)}%; position: relative;'></div>`;
    } catch {
      return ``;
    }
  });
}

function renderYoutube(wrapperId, youtubeID) {
  const el = document.querySelector(`#${wrapperId}`);
  el.innerHTML = `<iframe width="100%" height="100%" style='position: absolute; top: 0; left: 0; border:none;' src="https://www.youtube.com/embed/${youtubeID}"></iframe>`;
}

export const imagePlugin = (editor) => {
  const codeBlockManager = Object.getPrototypeOf(editor).constructor.codeBlockManager;

  codeBlockManager.setReplacer('image', (JSON_STRING) => {
    try {
      const { url, size } = JSON.parse(JSON_STRING);
      const wrapperId = `image${Math.random().toString(36).substr(2, 10)}`;
      setTimeout(renderImage.bind(null, wrapperId, url), 0);

      if (size) {
        return `<div id="${wrapperId}" style='width: ${size.width}px; max-width:100%; height: 100%; margin:auto; padding-top: ${(size.height / size.width * 100).toFixed(2)}%; position: relative;'></div>`;
      } else {
        return `<div id="${wrapperId}" style='margin:auto;'></div>`;
      }
    } catch {
      return `<div id="${wrapperId}" style='margin:auto;'></div>`;
    }
  });
}

function renderImage(wrapperId, url) {
  const el = document.querySelector(`#${wrapperId}`);
  el.innerHTML = `<img style='margin:0;' src="${url}"/>`;
}