/**
 *
 * @param {String} key 变量名
 * @param {Array} arr 所有状态
 * @returns {Function}
 */
const typeFormatter = function(key, arr, str) {
  return function(row) {
    const list = arr.filter(item => String(item.value) === String(row[key]))
    return list[0] ? list[0].label : str || ''
  }
}

const booleanFormatter = function(key) {
  return (row) => {
    const flag = row[key]
    if (flag) {
      return 'true'
    } else {
      return 'false'
    }
  }
}

export {
  typeFormatter,
  booleanFormatter
}
