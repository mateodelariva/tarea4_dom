document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        previewContainer: document.getElementById('preview-container'),
        elementSelector: document.getElementById('element-selector'),
        propertySelector: document.getElementById('property-selector'),
        valueSelector: document.getElementById('value-selector'),
        applyStyleBtn: document.getElementById('apply-style'),
        resetStylesBtn: document.getElementById('reset-styles'),
        deleteElementBtn: document.getElementById('delete-element'),
        clearAllBtn: document.getElementById('clear-all'),
        elementButtons: document.querySelectorAll('.element-btn')
    };

    // Element counters
    const elementCounters = {
        container: 0, text: 0, button: 0, 
        input: 0, link: 0, list: 0
    };

    // CSS Properties with possible values
    const cssProperties = {
        color: ['black', 'white', 'red', 'blue', 'green', '#4361ee', '#f72585'],
        backgroundColor: ['transparent', 'white', '#f8f9fa', '#4361ee', '#f72585', '#4cc9f0'],
        fontSize: ['12px', '14px', '16px', '18px', '20px', '24px', '32px'],
        fontWeight: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
        border: ['none', '1px solid #ddd', '2px dashed #4361ee', '3px dotted #f72585'],
        borderRadius: ['0', '4px', '8px', '12px', '50%'],
        padding: ['0', '4px', '8px', '12px', '16px', '24px'],
        margin: ['0', '4px', '8px', '12px', '16px', '24px'],
        width: ['auto', '50px', '100px', '200px', '100%'],
        height: ['auto', '50px', '100px', '200px'],
        display: ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'],
        textAlign: ['left', 'center', 'right', 'justify']
    };

    // Element configurations
    const elementConfigs = {
        container: { tag: 'div', content: 'Contenedor', editable: true },
        text: { tag: 'p', content: 'Texto de ejemplo', editable: true },
        button: { tag: 'button', content: 'Botón' },
        input: { tag: 'input', attributes: { type: 'text', placeholder: 'Entrada' } },
        link: { tag: 'a', content: 'Enlace', attributes: { href: '#' } },
        list: { 
            tag: 'ul', 
            children: Array(3).fill().map((_, i) => ({
                tag: 'li', content: `Elemento ${i+1}`
            }))
        }
    };

    // Initialize app
    function init() {
        setupEventListeners();
        loadCSSProperties();
    }

    // Set up event listeners
    function setupEventListeners() {
        elements.elementButtons.forEach(btn => {
            btn.addEventListener('click', () => createElement(btn.dataset.type));
        });

        elements.elementSelector.addEventListener('change', updateElementSelection);
        elements.propertySelector.addEventListener('change', updatePropertyValues);
        
        elements.applyStyleBtn.addEventListener('click', applyStyle);
        elements.resetStylesBtn.addEventListener('click', resetElementStyles);
        elements.deleteElementBtn.addEventListener('click', deleteSelectedElement);
        elements.clearAllBtn.addEventListener('click', clearPreview);
    }

    // Create new element
    function createElement(type) {
        elementCounters[type]++;
        const config = elementConfigs[type];
        const newElement = document.createElement(config.tag);
        
        // Set content and attributes
        if (config.content) newElement.textContent = `${config.content} ${elementCounters[type]}`;
        if (config.editable) newElement.contentEditable = true;
        
        // Add additional attributes
        if (config.attributes) {
            Object.entries(config.attributes).forEach(([key, value]) => {
                newElement.setAttribute(key, value);
            });
        }
        
        // Create children if they exist
        if (config.children) {
            config.children.forEach(childConfig => {
                const child = createChildElement(childConfig, type);
                newElement.appendChild(child);
            });
        }
        
        // Add common classes and attributes
        newElement.className = 'created-element';
        newElement.dataset.elementName = `${type}${elementCounters[type]}`;
        newElement.style.animation = 'fadeIn 0.5s ease';
        
        // Remove empty message if it exists
        const emptyMsg = elements.previewContainer.querySelector('.empty-message');
        if (emptyMsg) elements.previewContainer.removeChild(emptyMsg);
        
        elements.previewContainer.appendChild(newElement);
        updateElementSelector();
        
        // Automatically select the new element
        elements.elementSelector.value = elements.previewContainer.children.length - 1;
        highlightSelectedElement();
    }
    
    // Helper function to create child elements
    function createChildElement(config, parentType) {
        const element = document.createElement(config.tag);
        if (config.content) element.textContent = `${config.content} ${elementCounters[parentType]}`;
        if (config.children) config.children.forEach(child => element.appendChild(createChildElement(child, parentType)));
        return element;
    }

    // Update element selector
    function updateElementSelector() {
        elements.elementSelector.innerHTML = '<option value="-1">Seleccionar elemento</option>';
        
        Array.from(elements.previewContainer.children).forEach((element, index) => {
            const type = element.tagName.toLowerCase();
            const option = document.createElement('option');
            option.value = index;
            
            const elementTypes = {
                'div': 'Contenedor', 'p': 'Texto', 'button': 'Botón',
                'input': 'Entrada', 'a': 'Enlace', 'ul': 'Lista'
            };
            
            const displayName = elementTypes[type] || type;
            const count = Array.from(elements.previewContainer.children)
                .filter(el => el.tagName.toLowerCase() === type).length;
            
            option.textContent = `${displayName} ${count}`;
            elements.elementSelector.appendChild(option);
        });
    }

    // Highlight selected element
    function highlightSelectedElement() {
        Array.from(elements.previewContainer.children).forEach(el => {
            el.style.outline = 'none';
            el.style.outlineOffset = '0';
        });
        
        if (elements.elementSelector.value !== '-1') {
            const selectedElement = elements.previewContainer.children[elements.elementSelector.value];
            selectedElement.style.outline = '2px solid var(--primary-color)';
            selectedElement.style.outlineOffset = '2px';
        }
    }

    // Update element selection
    function updateElementSelection() {
        highlightSelectedElement();
    }

    // Load CSS properties into selector
    function loadCSSProperties() {
        elements.propertySelector.innerHTML = '<option value="-1">Seleccionar propiedad</option>';
        
        Object.keys(cssProperties).forEach(property => {
            const option = document.createElement('option');
            option.value = property;
            option.textContent = property;
            elements.propertySelector.appendChild(option);
        });
    }

    // Update property values
    function updatePropertyValues() {
        const property = elements.propertySelector.value;
        elements.valueSelector.innerHTML = '<option value="-1">Seleccionar valor</option>';
        
        if (property !== '-1' && cssProperties[property]) {
            cssProperties[property].forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                elements.valueSelector.appendChild(option);
            });
        }
    }

    // Apply selected style
    function applyStyle() {
        const { elementSelector, propertySelector, valueSelector, previewContainer } = elements;
        
        if (elementSelector.value === '-1') return showNotification('Por favor selecciona un elemento', 'error');
        if (propertySelector.value === '-1') return showNotification('Por favor selecciona una propiedad', 'error');
        if (valueSelector.value === '-1') return showNotification('Por favor selecciona un valor', 'error');
        
        const element = previewContainer.children[elementSelector.value];
        
        try {
            element.style.transition = 'all 0.3s ease';
            element.style[propertySelector.value] = valueSelector.value;
            
            setTimeout(() => element.style.transition = '', 300);
            triggerAnimation(element);
            
            showNotification('Estilo aplicado correctamente', 'success');
        } catch (error) {
            console.error('Error applying style:', error);
            showNotification('Error al aplicar el estilo', 'error');
        }
    }
    
    // Trigger animation for visual feedback
    function triggerAnimation(element) {
        element.style.animation = 'none';
        setTimeout(() => element.style.animation = 'fadeIn 0.5s ease', 10);
    }

    // Reset element styles
    function resetElementStyles() {
        if (elements.elementSelector.value === '-1') {
            return showNotification('Por favor selecciona un elemento', 'error');
        }
        
        if (confirm('¿Estás seguro de reiniciar los estilos de este elemento?')) {
            const element = elements.previewContainer.children[elements.elementSelector.value];
            element.removeAttribute('style');
            showNotification('Estilos reiniciados', 'success');
        }
    }

    // Delete selected element
    function deleteSelectedElement() {
        if (elements.elementSelector.value === '-1') {
            return showNotification('Por favor selecciona un elemento', 'error');
        }
        
        if (confirm('¿Estás seguro de eliminar este elemento?')) {
            const element = elements.previewContainer.children[elements.elementSelector.value];
            element.style.animation = 'fadeIn 0.3s ease reverse forwards';
            
            setTimeout(() => {
                elements.previewContainer.removeChild(element);
                updateElementSelector();
                
                if (elements.previewContainer.children.length === 0) {
                    const emptyMsg = document.createElement('p');
                    emptyMsg.className = 'empty-message';
                    emptyMsg.textContent = 'Usa los botones de creación';
                    elements.previewContainer.appendChild(emptyMsg);
                }
                
                showNotification('Elemento eliminado', 'success');
            }, 300);
        }
    }

    // Clear all preview
    function clearPreview() {
        if (elements.previewContainer.children.length === 0) return;
        
        if (confirm('¿Estás seguro de limpiar todos los elementos?')) {
            Array.from(elements.previewContainer.children).forEach(element => {
                element.style.animation = 'fadeIn 0.3s ease reverse forwards';
            });
            
            setTimeout(() => {
                elements.previewContainer.innerHTML = '<p class="empty-message">Usa los botones de creación</p>';
                Object.keys(elementCounters).forEach(key => elementCounters[key] = 0);
                showNotification('Vista previa limpiada', 'success');
            }, 300);
        }
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    init();
});