var widget = new ListWidget()

firstStackColor = Color.dynamic(new Color("#FFFFFF") ,new Color("#111112"))
secondStackColor = Color.dynamic(new Color("#E5E5E5") ,new Color("#161618"))
lastStackColor = Color.dynamic(new Color("#CCCCCC") ,new Color("#1c1c1e"))

let gradient = new LinearGradient()
gradient.colors = [firstStackColor, firstStackColor, secondStackColor, secondStackColor, secondStackColor, lastStackColor, lastStackColor]
gradient.locations = [0.33, 0.33, 0.33, 0.66, 0.66, 0.66,  1]
widget.backgroundGradient = gradient

let mainCol = widget.addStack()
mainCol.layoutVertically()

let cal = await Calendar.forEvents()
let events = []
const sdate = new Date();
const edate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
events = await CalendarEvent.between(sdate, edate, cal)

let df = new DateFormatter()
df.dateFormat = " d MMM"

let symName = "clock.fill"
let symColor = "#DF5143"

for (var i = 0; i < 3; i++) {

    eventTitle = events[i].title

    if ((eventTitle.toLowerCase()).includes("yaş günü")) {
        symName = "gift.fill"
        symColor = "#6E6DE4"
    } else if ((eventTitle.toLowerCase()).includes("ödeme") || (eventTitle.toLowerCase()).includes("deneme süresi")) {
        symName = "cart.fill"
        symColor = "#39C668"
    } else if ((eventTitle.toLowerCase()).includes("uçak")) {
        symName = "airplane"
        symColor = "#F8A627"
    } else if ((eventTitle.toLowerCase()).includes("okul") || (eventTitle.toLowerCase()).includes("ödev")) {
        symName = "graduationcap.fill"
        symColor = "#65CDCA"
    } else { symName = "clock.fill"; symColor = "#DF5143"  }

    let sym = SFSymbol.named(symName)
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
    symImg.tintColor = new Color(symColor, 1.0-i*0.25)
    var dateText = dateRow.addText((df.string(events[i].endDate)).toUpperCase())
    dateText.textColor = new Color(symColor)
    dateText.font = Font.boldSystemFont(10)
    
    textRow.layoutVertically()
    var titleText = textRow.addText(eventTitle)
    titleText.lineLimit = 1
    titleText.font = Font.systemFont(16)
    
    titleText.textOpacity = dateText.textOpacity = 1.0-i*0.25
}

Script.setWidget(widget)