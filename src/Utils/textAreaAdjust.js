export const textAreaAdjust = (element) => {
    if (element) {
      const scrollPos = element.scrollTop; // Save scroll position
      const cursorPos = element.selectionStart; // Save cursor position

      const prevHeight = element.style.height;
      element.style.height = "auto"; // Reset height

      const newHeight = `${element.scrollHeight}px`;

      // Resize only when necessary
      if (prevHeight !== newHeight) {
        element.style.height = newHeight;
      }

      // Restore cursor and scroll position smoothly
      element.scrollTop = scrollPos;
      element.setSelectionRange(cursorPos, cursorPos);
    }
  };
