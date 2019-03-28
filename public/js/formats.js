//Fonts
let Font = Quill.import('formats/font');

Font.whitelist = ['inconsolata', 'roboto', 'mirza', 'arial'];
Quill.register(Font, true);

//Sizes
let Size = Quill.import('attributors/style/size');

Size.whitelist = ['8px', '10px', '12px', '14px', '16px', '18px', '20px'];
Quill.register(Size, true);

