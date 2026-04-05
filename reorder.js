const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Update Coinley bullets
content = content.replace(
    /<ul class="venture-features">\s*<li>Accept USDT and USDC payments<\/li>\s*<li>Instant settlements<\/li>\s*<li>Custom SDK &amp; APIs<\/li>\s*<li>Global coverage<\/li>\s*<\/ul>/,
    `<ul class="venture-features">
                        <li>Customers pay with any popular crypto token</li>
                        <li>Stablecoins as the settlement layer</li>
                        <li>Merchants receive stablecoins instantly</li>
                    </ul>`
);

// 2. Extract sections
const venturesStart = content.indexOf('    <!-- Ventures -->');
const venturesEnd = content.indexOf('    <!-- Communities -->');
const venturesSection = content.substring(venturesStart, venturesEnd);

const aboutStart = content.indexOf('    <!-- About -->');
const aboutEnd = content.indexOf('    <!-- Ventures -->');
const aboutSection = content.substring(aboutStart, aboutEnd);

const commStart = content.indexOf('    <!-- Communities -->');
const commEnd = content.indexOf('    <!-- Content -->');
const commSection = content.substring(commStart, commEnd);

// 3. Remove About from current position
content = content.substring(0, aboutStart) + content.substring(aboutEnd);

// 4. Find new Ventures end (where Communities starts)
const newVenturesEnd = content.indexOf('    <!-- Communities -->');
// 5. Insert About where Communities was (after Ventures)
content = content.substring(0, newVenturesEnd) + aboutSection + content.substring(newVenturesEnd);

// 6. Remove Communities
content = content.replace(commSection, '');

// 7. Remove About from nav
content = content.replace(
    '                <li><a href="#about">About</a></li>\n',
    ''
);

fs.writeFileSync('index.html', content);
console.log('Done!');
