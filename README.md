# Getting Started with SearchLookUpField


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

![image](https://github.com/DhaiDev/SearchLookUpField/assets/88443783/aa673c68-9e85-4c9f-b077-0353475542cc)

### Try on CodeSand
[![Edit DhaiDev/SearchLookUpField/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/DhaiDev/SearchLookUpField/main?import=true&embed=1&file=%2F.codesandbox%2Ftasks.json)

```jsx
<SearchLookUpField
  valueMember="id"
  displayMember="partCode"
  rows={rows}
  columns={columns}
  value={value}
  onChangeValue={handleSearchFieldChange}
/>
```
- ValueMember is the actual value from the field
- DisplayMember is the display value on the field

