<?php
if ( function_exists('acf_add_local_field_group') ) :
	acf_add_local_field_group(array(
		'key' => 'group_5f6ddfa5b5192',
		'title' => 'Terra Feed',
		'fields' => array(
			array(
				'key' => 'field_5fad2bd652c89',
				'label' => 'Pre filter posts on load?',
				'name' => 'terra_pre_filter',
				'type' => 'true_false',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'message' => '',
				'default_value' => 0,
				'ui' => 0,
				'ui_on_text' => '',
				'ui_off_text' => '',
			),
			array(
				'key' => 'field_5fad2bf352c8a',
				'label' => 'Taxonomy',
				'name' => 'terra_taxonomies',
				'type' => 'select',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => array(
					array(
						array(
							'field' => 'field_5fad2bd652c89',
							'operator' => '==',
							'value' => '1',
						),
					),
				),
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(),
				'default_value' => false,
				'allow_null' => 0,
				'multiple' => 0,
				'ui' => 0,
				'return_format' => 'value',
				'ajax' => 0,
				'placeholder' => '',
			),
			array(
				'key' => 'field_5fad2d3a52c8b',
				'label' => 'Term',
				'name' => 'terra_term',
				'type' => 'text',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => array(
					array(
						array(
							'field' => 'field_5fad2bd652c89',
							'operator' => '==',
							'value' => '1',
						),
					),
				),
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'maxlength' => '',
			),
			array(
				'key' => 'field_5fad119128b11',
				'label' => 'Name',
				'name' => 'terra_name',
				'type' => 'text',
				'instructions' => '',
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'maxlength' => '',
			),
			array(
				'key' => 'field_5f6de02a949cf',
				'label' => 'Post Type',
				'name' => 'terra_post_type',
				'type' => 'select',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(),
				'default_value' => false,
				'allow_null' => 0,
				'multiple' => 0,
				'ui' => 0,
				'return_format' => 'value',
				'translations' => 'sync',
				'ajax' => 0,
				'placeholder' => '',
			),
			array(
				'key' => 'field_5f6de4eb6c71d',
				'label' => 'Posts Per Page',
				'name' => 'terra_posts_per_page',
				'type' => 'number',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'min' => -1,
				'max' => '',
				'step' => '',
				'translations' => 'sync',
			),
			array(
				'key' => 'field_5f6de6966c71f',
				'label' => 'Custom Class',
				'name' => 'terra_class',
				'type' => 'text',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'maxlength' => '',
				'translations' => 'translate',
			),
			array(
				'key' => 'field_5f6de6536c71e',
				'label' => 'Single Item Template',
				'name' => 'terra_template',
				'type' => 'text',
				'instructions' => 'Override the template item to display each post item.
	eg: \'template-parts/post-single-item\'
	(default is template-parts/[post-type]-single-item.php)',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'maxlength' => '',
				'translations' => 'translate',
			),
			array(
				'key' => 'field_5f6de6c46c720',
				'label' => 'No Content Template',
				'name' => 'terra_template_none',
				'type' => 'text',
				'instructions' => 'Override the template item to display when no posts are found.
	eg: \'template-parts/content-none\'
	(default is template-parts/content-none.php)',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'maxlength' => '',
				'translations' => 'translate',
			),
			array(
				'key' => 'field_5f6de8416c723',
				'label' => 'Taxonomy Filters',
				'name' => 'terra_filters',
				'type' => 'repeater',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'collapsed' => '',
				'min' => 0,
				'max' => 0,
				'layout' => 'block',
				'button_label' => '',
				'sub_fields' => array(
					array(
						'key' => 'field_5f6de8816c724',
						'label' => 'Taxonomy',
						'name' => 'terra_taxonomies',
						'type' => 'select',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'choices' => array(),
						'default_value' => false,
						'allow_null' => 0,
						'multiple' => 0,
						'ui' => 0,
						'return_format' => 'value',
						'translations' => 'sync',
						'ajax' => 0,
						'placeholder' => '',
					),
					array(
						'key' => 'field_5f6dea2ffab9e',
						'label' => 'Label',
						'name' => 'label',
						'type' => 'text',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'maxlength' => '',
						'translations' => 'translate',
					),
					array(
						'key' => 'field_5f6dea38fab9f',
						'label' => 'Placeholder',
						'name' => 'placeholder',
						'type' => 'text',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'maxlength' => '',
						'translations' => 'translate',
					),
				),
			),
			array(
				'key' => 'field_5f6de7cf6c721',
				'label' => 'Show Search Box',
				'name' => 'terra_search',
				'type' => 'true_false',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'message' => '',
				'default_value' => 0,
				'ui' => 0,
				'translations' => 'sync',
				'ui_on_text' => '',
				'ui_off_text' => '',
			),
			array(
				'key' => 'field_5f6defae7a3fc',
				'label' => 'Show Post Count',
				'name' => 'terra_post_count',
				'type' => 'true_false',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'message' => '',
				'default_value' => 0,
				'ui' => 0,
				'translations' => 'sync',
				'ui_on_text' => '',
				'ui_off_text' => '',
			),
			array(
				'key' => 'field_5f6de7fd6c722',
				'label' => 'Sort By',
				'name' => 'terra_sort',
				'type' => 'select',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'date' => 'Date',
					'title' => 'Title',
					'menu_order' => 'Menu Order (Post Types Order plugin)',
				),
				'default_value' => false,
				'allow_null' => 1,
				'multiple' => 0,
				'ui' => 0,
				'return_format' => 'value',
				'translations' => 'sync',
				'ajax' => 0,
				'placeholder' => '',
			),
			array(
				'key' => 'field_5f6deaa9faba0',
				'label' => 'Pagination or Load More',
				'name' => 'terra_end',
				'type' => 'select',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'pagination' => 'Pagination',
					'load_more' => 'Load More',
				),
				'default_value' => 'pagination',
				'allow_null' => 0,
				'multiple' => 0,
				'ui' => 0,
				'return_format' => 'value',
				'translations' => 'sync',
				'ajax' => 0,
				'placeholder' => '',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'block',
					'operator' => '==',
					'value' => 'acf/terra-feed',
				),
			),
		),
		'menu_order' => 0,
		'position' => 'normal',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => '',
	));
endif;
