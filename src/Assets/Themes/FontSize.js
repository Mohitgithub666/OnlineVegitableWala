import Colors from './Colors'

function applyRatio(pointsSize) {
  return pointsSize
}

function applyRatioInterSpacing(interSize) {
  return interSize / 100
}

const size = {
  h40: applyRatio(40),
  h38: applyRatio(38),
  h36: applyRatio(36),
  h34: applyRatio(34),
  h32: applyRatio(32),
  h30: applyRatio(30),
  h28: applyRatio(28),
  h26: applyRatio(26),
  h24: applyRatio(24),
  h22: applyRatio(22),
  h20: applyRatio(20),
  h19: applyRatio(19),
  h18: applyRatio(18),
  h16: applyRatio(16),
  h14: applyRatio(14),
  h12: applyRatio(12),
  h10: applyRatio(10)
}
const interSpacing = {
  small: applyRatioInterSpacing(40),
  medium: applyRatioInterSpacing(70),
  mediumBig: applyRatioInterSpacing(90),
  big: applyRatioInterSpacing(100),
  xBig: applyRatioInterSpacing(200),
  xxBig: applyRatioInterSpacing(300)
}


const letterSpacing = {
  bodycopyLower: {
    lineHeight: 32,
    letterSpacing: 70
  },
  majorTitle: {
    lineHeight: 58,
    letterSpacing: 40
  },
  messageToUser: {
    lineHeight: 30,
    letterSpacing: 40
  },
  productName: {
    lineHeight: 22,
    letterSpacing: 40
  },
  sectionTitle: {
    lineHeight: 35,
    letterSpacing: 40
  },
  title: {
    lineHeight: 32,
    letterSpacing: 200
  }
}

const style = {
  title: {
    fontSize: size.xbig,
    color: Colors.black,
    fontWeight: 'bold'
  },
  smallerTitle: {
    fontSize: size.big,
    color: Colors.black
  },
  titleMenu: {
    fontSize: size.h4,
    fontWeight: 'bold'
  },
  clickableText: {
    fontSize: size.h4
  }
}
export default {
  size,
  style,
  letterSpacing,
  interSpacing
}
