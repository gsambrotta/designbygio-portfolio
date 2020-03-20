document.querySelector('#copyEmail').addEventListener('click', copyToClipboard)

function copyToClipboard() {
  const textarea = document.createElement('textarea')
  textarea.value = 'designbygio@pm.me'
  textarea.setAttribute('readonly', '') // not findable to screenreaders
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'

  document.body.appendChild(textarea)
  textarea.select()

  // copy to clipboard
  document.execCommand('copy')
  if (document.execCommand('copy')) {
    const toCopyText = document.getElementById('copyEmail')
    const copiedText = document.getElementById('emailCopied')

    toCopyText.style.display = 'none'
    copiedText.style.display = 'inline-block'

    setTimeout(function() {
      toCopyText.style.display = 'inline-block'
      copiedText.style.display = 'none'
    }, 3000)
  }

  document.body.removeChild(textarea)
}
