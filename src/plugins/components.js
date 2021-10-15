import Vue from 'vue'

import Table from 'e/Table'
import TablePage from 'c/Page/TablePage'
import TreePage from 'c/Page/TreePage'
import crudPage from 'c/Page/crudPage'
import Dialog from 'e/Dialog'
import DialogFrom from 'e/Dialog/DialogForm'
import Button from 'e/Button'
import Tab from 'e/Tab'
import Dropdown from 'e/Dropdown'
import SymbolIcon from 'c/SvgIcon/SymbolIcon'

import AlForm from 'e/Form'
import AlInput from 'e/Form/Input'
import AlSelect from 'e/Form/Select'

Vue.component('al-button', Button)
Vue.component('al-tab', Tab)
Vue.component('al-dropdown', Dropdown)
Vue.component('al-table', Table)
Vue.component('al-table-page', TablePage)
Vue.component('al-tree-page', TreePage)
Vue.component('al-crud-page', crudPage)
Vue.component('al-dialog', Dialog)
Vue.component('al-dialog-form', DialogFrom)
Vue.component('al-symbol-icon', SymbolIcon)

// Form
Vue.component('al-form', AlForm)
Vue.component('al-input', AlInput)
Vue.component('al-select', AlSelect)
