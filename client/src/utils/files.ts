export function downloadFile(fileName: string, content: string, type: string) {
  // Courtesy Stackoverflow
  const file = new Blob([content], { type: `${type};charset=utf-8;` });
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
