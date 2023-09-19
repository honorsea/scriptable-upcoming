var widget = new ListWidget()

fColor = Color.dynamic(new Color("#FFFFFF") ,new Color("#111112"))
mColor = Color.dynamic(new Color("#E5E5E5") ,new Color("#161618"))
lColor = Color.dynamic(new Color("#CCCCCC") ,new Color("#1c1c1e"))

let gradient = new LinearGradient()
gradient.colors = [fColor, fColor, mColor, mColor, mColor, lColor, lColor]
gradient.locations = [0.33, 0.33, 0.33, 0.66, 0.66, 0.66,  1]
widget.backgroundGradient = gradient

let mainCol = widget.addStack()
mainCol.layoutVertically()

let cal = await Calendar.forEvents()
let events = []
const dateNow = new Date();
const edate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
events = await CalendarEvent.between(dateNow, edate, cal)

let df = new DateFormatter()
df.dateFormat = " MMM d"

let symName = "clock.fill"
let symColor = "#DF5143"

for (var i = 0; i < 3; i++) {
    eventTitle = events[i].title

    let syms = getSpecialty(eventTitle.toLowerCase())
    let sym = SFSymbol.named(syms[0])
    sym.applyBoldWeight()

    let row = mainCol.addStack()
    row.size = new Size(130, 52)
    row.centerAlignContent()
    row.layoutVertically()

    let dateRow = row.addStack()
    let textRow = row.addStack()

    dateRow.centerAlignContent()
    let symImg = dateRow.addImage(sym.image)
    symImg.imageSize = new Size(10,10)
    symImg.tintColor = new Color(syms[1], 1.0-i*0.25)

    if ((events[i].endDate).getMonth() == dateNow.getMonth() && (events[i].endDate).getDate() == dateNow.getDate()) {
    var dateText = dateRow.addText(" TODAY")
    } else { var dateText = dateRow.addText((df.string(events[i].endDate)).toUpperCase()) }
    dateText.textColor = new Color(syms[1])
    dateText.font = Font.boldSystemFont(10)
    
    textRow.layoutVertically()
    var titleText = textRow.addText(eventTitle)
    titleText.lineLimit = 1
    titleText.font = Font.systemFont(16)
    
    titleText.textOpacity = dateText.textOpacity = 1.0-i*0.25
}

function getSpecialty(title) {
    if (title.includes("birthday")) { return ["gift.fill","#6E6DE4"] }
    else if (title.includes("payment") || title.includes("subscription")) { return["cart.fill","#39C668"] }
    else if (title.includes("flight")) { return["airplane","#F8A627"] }
    else if (title.includes("school") || title.includes("homework")) { return["graduationcap.fill","#65CDCA"] }
    else { return ["clock.fill","#DF5143"] }
}

if(!config.runsInWidget){
    let uit = new UITable()
    uit.showSeparators = true
    
    for (var i = 0; i < events.length; i++) {
    eventTitle = events[i].title
    
    let row = new UITableRow()
    uit.addRow(row)

    var titleText = row.addText(eventTitle, (df.string(events[i].endDate)).toUpperCase()) }
    
    QuickLook.present(uit)
}

Script.setWidget(widget)