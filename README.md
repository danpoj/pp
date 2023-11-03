youtube shorts

```js
window.clearInterval(scroll)
console.clear()
let result = ''
shorts = $$('ytd-rich-item-renderer')
for (let i = 0; i < shorts.length; i++) {
  const url = shorts[i].querySelector('#thumbnail').href
  if (!url) continue
  result += url + '\n'

  if (i === 101) break
}

console.log(result)
```
