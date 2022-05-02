export function handleRefresh(setRefresh) {
  setRefresh(true);
}    

export function removeNonAscii(decodedData) {
  return decodedData
    .replace(
      /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\[\]`~/\n]*/g,
      ""
    )
    .replace(/,/g, "\n");
}

  /*
  export function checkPage(dataCounter) {
    if (dataCounter % 10 == 5 || dataCounter % 10 == 0)
      setPageCurrent(pageCurrent + 1);
  }

  export function handlePreviousPage() {
    setPageCurrent(pageCurrent - 1 < 1 ? 1 : pageCurrent - 1);
    console.log("previous page clicked", pageCurrent);
  }

   export function handleNextPage {
    setPageCurrent(pageCurrent + 1);
    console.log("next page clicked", pageCurrent);
  }
*/