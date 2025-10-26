import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B21B6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Gradientes simulados
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    backgroundColor: '#7C3AED',
    opacity: 0.5,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: '#4C1D95',
    opacity: 0.6,
  },

  // Círculos decorativos
  circleDecor1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
  },
  circleDecor2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(167, 139, 250, 0.15)',
  },
  circleDecor3: {
    position: 'absolute',
    top: height * 0.4,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  // Conteúdo Principal
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  // Ícone Principal
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  // Título
  titleContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: '#A78BFA',
    borderRadius: 2,
    marginTop: 8,
  },

  // Subtítulo
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#E9D5FF',
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  // Barra de Progresso
  progressContainer: {
    width: width * 0.6,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#A78BFA',
    borderRadius: 3,
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },

  // Versão
  version: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  // Ícones Flutuantes
  floatingIcon1: {
    position: 'absolute',
    top: height * 0.15,
    left: 30,
  },
  floatingIcon2: {
    position: 'absolute',
    top: height * 0.25,
    right: 40,
  },
  floatingIcon3: {
    position: 'absolute',
    bottom: height * 0.2,
    left: 50,
  },
  floatingIcon4: {
    position: 'absolute',
    bottom: height * 0.15,
    right: 30,
  },
});