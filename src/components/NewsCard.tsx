import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { NewsCardProps } from './NewsCardProps';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export function NewsCard(props: NewsCardProps) {
  const {
    menuVisible,
    handlePress,
    handleShare,
    handleOpenOriginal,
    formatDate,
    showMenu,
    hideMenu,
    article,
  } = props;

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Sem imagem</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>

        {article.description && (
          <Text style={styles.description} numberOfLines={3}>
            {article.description}
          </Text>
        )}
        <View style={styles.footer}>
          <View style={styles.sourceContainer}>
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
            <Text style={styles.separator}> • </Text>
            <Text style={styles.source} numberOfLines={1}>
              {article.source.name}
            </Text>
          </View>
          <TouchableOpacity onPress={showMenu} style={styles.menuButton}>
            <FontAwesome6 name="ellipsis-vertical" size={12} color="gray" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={hideMenu}
        >
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={hideMenu}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.menuOption} onPress={handleShare}>
                <Text style={styles.menuOptionText}>Compartilhar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={handleOpenOriginal}>
                <Text style={styles.menuOptionText}>Abrir original</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.menuOption, styles.menuOptionLast]}
                onPress={hideMenu}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#8C8E90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C2C2C',
    lineHeight: 22,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#8C8E90',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  source: {
    fontSize: 12,
    color: '#EB455B',
    fontWeight: '600',
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#8C8E90',
    flexShrink: 0,
  },
  separator: {
    fontSize: 12,
    color: '#8C8E90',
    marginHorizontal: 4,
    flexShrink: 0,
  },
  menuButton: {
    padding: 16,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuOptionLast: {
    borderBottomWidth: 0,
  },
  menuOptionText: {
    fontSize: 16,
    color: '#2C2C2C',
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#EB455B',
    fontWeight: '600',
    textAlign: 'center',
  },
});
