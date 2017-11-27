/*
 * Welcome! to ESS apps hacking/development/maintanance!
 * This is the first file you need to read before start hacking JS files in these apps. 
 * Here we talk about informal standards we followed, strict coding guidelines to be followed. 
 * We will also add information relevant and useful to future developers of these apps. 
 * Note: This is not documenting app, this is only from one developer to anohter developer notes. 
 *       For documentation please refer to confluence pages. 
 *
 * == General Guidelines ==
 * 1. KISS: Keep It Simple & Stupid. 
 * 	When there are two ways – one is simpler way other is a bit complex way: 
 * 	The choice is crystal clear, always choose simpler one. Read more @ https://en.wikipedia.org/wiki/KISS_principle 
 * 2. Code is like school dress. 
 *      Everything must look and feel same. That means everybody should format in the same way. 
 *      Do not underestimate the power of subtle reading capability of our brain. 
 *      When code looks same we understand it faster. We feel comfortable to debug and maintain.
 *      Format all _m.js files with http://jsbeautifier.org ; Do not use any thing else. Everybody must be on same page.
 * 3. Follow Javascript coding guidelines at https://google.github.io/styleguide/javascriptguide.xml
 * == Object Oriented is the only way ==
 * 1. Everything must be an object.
 * 	The exceptions: 
 * 	a) handleError_m.js file. 
 * 	b) Global variables file (AppGlobals.js) constants also goes here. 
 * 2. There must be a unique binding point for every method inside an object. For example, of a Form.
 * 3. One file should have only one major object. 
 *      Create separate files for each major object.
 *      Put the names of the file and object matching. 
 * == Variables ==
 * === Naming conventions ===
 *     1. Should be meaningful.
 *     2. Must be unambiguous.
 *     3. Must always be defined with var keyword.
 *     4. Must always start with lowercaseLetter and in camelCase.
 *     5. Do not use short cuts. (e.g. do not use i, j, pst, ast, pk) it is ok to be long
 *     6. Be a little creative in naming. By simply reading the line of code we must get what it is doing.
 *     7. Constants must be LIKE_THIS always. eg.. const I_AM_CONST = '212';
 *
 * === Global Variables === 
 *     1. Must be avoided.
 *     2. All global variables must be in single file. AppGlobals_m.js 
 *    Currently this is not the case, but we have to make it happen during next edits. 
 *     3. If compulsory must start with g letter. gthisInstanceCount.
 *     4. Every global variable must have enough comments to explain why we needed this, 
 *        where are we using this, how is this initialized.
 *
 * == File names == 
 *     1. All manually added files must end with _m.js; This helps us to differentiate them from auto generated files.
 *     2. The file name must match that of major class/object name.
 * == Widget names == 
 *     1. All the widget names must be hand coded and meaningful. 
 *        No auto generated names to be used for any of the widgets.
 *     2. All the widget names must start with three letter short acronym
 *         i. Button = btn (e.g.. btnStart)
 *         ii. Text Box = tbx (e.g.. tbxLogs)
 *         iii. Segment = seg (e.g.. segSearchResults)
 *         iv. Text Area
 * == Methods == 
 *     1. Look at Javascript naming conventions @ https://google.github.io/styleguide/javascriptguide.xml
 * == Comments ==
 * Follow JSDoc https://code.google.com/archive/p/jsdoc-toolkit for better comments.
 *     1. Add a comment at the start of file explaining the files role. TODO: Add an example. 
 *     2. Add a comment before start of every object/class. TODO: Add an example. 
 *     3. Add a comment before every method. TODO: Add an example. 
 *     4. Add comments describing moderate/complex logic blocks. 
 *        The code must be self explanatory but comments always helps.
 *        Most of the times, there is no such thing as spam comments here! 
 * == Error handling == 
 *     1. All errors shown to users must call handleError() method inside handleError_m.js file. 
 *     2. Use exceptions. 
 *     3. Do not eat exceptions. If you eat an exception - there must be an explanation in comments.
 *        This is important. Eating exceptions caused lot of bugs slip to production. 
 *
 * == Visualizer specific Guidelines ==
 * 1. Calling actions. Do not use action => call function. Always write the code in snippet. 
 *     This code snippet must also simply call function, must not have any piece of code - 
 *     other than calling this function. No if, no else and no but. Only initialize the  - 
 *     object and call function. All other business logic must be inside method belonging - 
 *     to a specific object. 
 *     Reason: a) It helps in debugging. It helps in understanding code more easily. 
 *             b) In the past we had a bug in visualizer where the function calls/code snippets disappears. 
 *                By making sure all code is in modules/*_m.js files, we will never loose the code.
 *             c) Code reviews are easier if we have all code in modules/*_m.js files. 
 * 2. Add more kony.print statements. 
 *         a) Each method should have kony.print at start / end of method. It must exactly follow below format. 
 *            kony.print("-- Start <[namespace].methodname> --");
 *            kony.print("-- End <[namespace].methodname> --");
 *            They must be in the above format, it will be easy to auto analize our logs later.
 *         b) Another important place to add kony.print statements is at important branching and vacuum blocks. 
 *            For example if we have only business logic in if(){} and no business in else{} then don't avoid else 
 *            statement completely. add else {kony.print()}; This helps a lot in debugging.
 * 3. Strictly separate out UI and nonUI classes in *_m.js files. 
 * 4. All the strings/messages shown to user must be from i18n. 
 * 5. All the warnings must be treated as errors and should be fixed before sending for code review. 
 *    No yellow icon in visualizer editor screen! 
 * == Other == 
 *      1. Multiple new lines is bad idea. Avoid them. They don't surve any purpose. 
 *      2. Use new lines wisely. To really separate logical blocks. 
 *      3. No commented code must be allowed, if you don't need it now, you never need it. 
 *         Just delete it. We can always check old code in our GIT. 
 *
 * == References == 
 * Useful Read:
 *    1. Three ways to create classes in JavaScript http://www.phpied.com/3-ways-to-define-a-javascript-class/
 *    2. JavaScript design patterns : https://addyosmani.com/resources/essentialjsdesignpatterns/book/
 */
