let Font = Quill.import('formats/font');
let socket = io();

Font.whitelist = ['inconsolata', 'roboto', 'mirza', 'arial'];
Quill.register(Font, true);
